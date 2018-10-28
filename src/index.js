const { getData, parseData, parseId } = require('./modules');

const scrapeOne = (leagueOptions) => {
    return getData(leagueOptions)
        .then((idData) => {
            return parseId(idData);
        })
        .then((idOptions) => {
            return getData(idOptions);
        })
        .then((tableData) => {
            return parseData(tableData, leagueOptions);
        })
        .then((output) => {
            return output;
        });
};

const scrapeMany = (list) => {
    const promises = [];
    list.forEach((options) => {
        const country = options.country;
        const league = options.league;
        const season = options.season;
        const promise = scrapeOne({ country, league, season });
        promises.push(promise);
    });
    return Promise.all(promises)
        .then((values) => {
            return values;
        });
};

module.exports = {
    scrapeOne,
    scrapeMany,
};
