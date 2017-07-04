const fetch = require('node-fetch');

const { BASE_URL } = require('./config');

const getData = (options) => {
    if ( (typeof options !== 'object') || (options === null)
        || (options instanceof Array) || (options instanceof Function) ) {
        throw new Error('you must pass an options'
            + ' object as the first parameter');
    }
    let url;
    if (options.country && options.league && options.season) {
        const season = String(options.season) + String(options.season + 1);
        url = `${BASE_URL}${options.country}/${options.league}/${season}`;
    } else if (options.seasonId && options.roundId) {
        url = `http://int.soccerway.com/a/block_competition_tables?block_id=page_competition_1_block_competition_tables_7&callback_params={"season_id":${options.seasonId},"round_id":${options.roundId},"outgroup":false,"competition_id":8,"new_design_callback":false}&action=changeTable&params={"type":"competition_wide_table"}`;
    }
    return fetch(url)
        .then((res) => {
            return res.text();
        });
};

module.exports = getData;
