const fetch = require('node-fetch');

const { BASE_URL, DATA_URL, ERR } = require('./constants');

const getData = (options) => {
    if ( (typeof options !== 'object') || (options === null)
        || (options instanceof Array) || (options instanceof Function) ) {
        throw new Error(ERR.GET_DATA.INVALID_OPTIONS);
    }
    let url;
    if (options.country && options.league && options.season) {
        const season = String(options.season) + String(options.season + 1);
        url = `${BASE_URL}${options.country}/${options.league}/${season}`;
    } else if (options.seasonId && options.roundId) {
        url = DATA_URL[0] + options.seasonId + DATA_URL[1]
            + options.roundId + DATA_URL[2];
    }
    return fetch(url)
        .then((res) => {
            return res.text();
        });
};

module.exports = getData;
