const { JSDOM } = require('jsdom');
const { SELECTORS, ERR, REGEX } = require('./constants');

const parseId = (html) => {
    if (typeof html !== 'string') {
        throw new Error(ERR.PARSE_ID.INVALID_HTML);
    }

    const dom = new JSDOM(html, {});
    const window = dom.window;
    const document = window.document;

    const idLen = 5;

    const options = {};

    options.seasonId = [].slice
        .call(document.querySelectorAll(SELECTORS.SEASONID))
        .filter((option) => option.getAttribute('selected') === 'selected')
        .map((option) => {
            option = option.value;
            const index = option.search(REGEX.SEASONID) + 2;
            return parseInt(option.slice(index, index + idLen), 10);
        })[0] || null;

    options.roundId = [].slice
        .call(document.querySelectorAll(SELECTORS.ROUNDID))
        .map((a) => {
            const href = a.getAttribute('href');
            const index = href.search(REGEX.ROUNDID) + 2;
            return parseInt(href.slice(index, index + idLen), 10);
        })[0] || null;

    return new Promise((resolve, reject) => {
        resolve(options);
    });
};

module.exports = parseId;
