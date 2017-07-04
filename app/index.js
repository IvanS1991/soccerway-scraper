/* globals __dirname */

const fs = require('fs');
const path = require('path');

const moduleFolder = path.join(__dirname, 'modules');

const app = {};

fs.readdirSync(moduleFolder)
    .map((moduleName) => {
        const index = moduleName.search(/.js/);
        return moduleName.slice(0, index);
    })
    .forEach((module) => {
        app[module] = require(path.join(moduleFolder, module));
    });

module.exports = app;
