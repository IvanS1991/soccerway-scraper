const { JSDOM } = require('jsdom');
const { SELECTORS } = require('./config');

const parseId = (html) => {
    if (typeof html !== 'string') {
        throw new Error('you must pass a valid html as the only parameter');
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
            const index = option.search(/\/s[0-9]/) + 2;
            return parseInt(option.slice(index, index + idLen), 10);
        })[0] || null;

    options.roundId = [].slice
        .call(document.querySelectorAll(SELECTORS.ROUNDID))
        .map((a) => {
            const href = a.getAttribute('href');
            const index = href.search(/\/r[0-9]/) + 2;
            return parseInt(href.slice(index, index + idLen), 10);
        })[0] || null;

    return new Promise((resolve, reject) => {
        resolve(options);
    });
};

module.exports = parseId;
