const { JSDOM } = require('jsdom');
const { SELECTORS } = require('./config');

const parseData = (data, leagueOptions) => {
    if (typeof data !== 'string') {
        throw new Error('you must pass a string as the first parameter');
    }
    if (typeof leagueOptions !== 'object'
        || !leagueOptions.hasOwnProperty('country')
        || !leagueOptions.hasOwnProperty('league')
        || !leagueOptions.hasOwnProperty('season')) {
            throw new Error('you must pass a valid leagueOptions object');
        }
    const league = {
        country: leagueOptions.country,
        league: leagueOptions.league,
        season: leagueOptions.season,
        teams: [],
    };

    const html = JSON.parse(data).commands[0].parameters.content;

    const dom = new JSDOM(html, {});
    const window = dom.window;
    const document = window.document;

    const rows = [].slice.call(document.querySelectorAll(SELECTORS.ROWS));

    rows.forEach((row) => {
        const team = {
            teamName: row.querySelector(SELECTORS.TEAM_NAME)
                .getAttribute('title'),
            stats: {},
        };
        const cells = [].slice.call(row.children)
            .slice(3);
        cells.forEach((cell) => {
            const label = [].slice.call(cell.classList)
                .slice(-1)[0];
            team.stats[label] = parseInt(cell.innerHTML, 10);
        });
        league.teams.push(team);
    });

    return new Promise((resolve, reject) => {
        resolve(league);
    });
};

module.exports = parseData;
