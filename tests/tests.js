const { expect } = require('chai');

const { parseId, parseData, getData } = require('../app');

describe('getData tests', () => {
    it('Should throw if the first parameter is not an object', () => {
        const invalidParams = [1, true, null, [], () => {}, 'asd'];
        invalidParams.forEach((param) => {
            const test = () => {
                getData(param);
            };
            expect(test).to.throw();
        });
    });
});

describe('parseId tests', () => {
    it('Should throw if the first parameter is not string', () => {
        const invalidParams = [1, true, null, [], {}];

        invalidParams.forEach((param) => {
            const test = () => {
                parseId(param);
            };
            expect(test).to.throw();
        });
    });

    it('Should return a promise', () => {
        const result = parseId('asd');

        expect(result).to.be.an.instanceof(Promise);
    });

    it(`Should resolve with an object with two properties 
        - seasonId and roundId`, (done) => {
        parseId('asd')
            .then((output) => {
                expect(output).to.be.an('object');
                expect(output).to.have.property('seasonId');
                expect(output).to.have.property('roundId');
            })
            .then(done, done);
    });
});

describe('parseData tests', () => {
    it('Should throw if the first parameter is not a valid json string', () => {
        const invalidFirst = [1, true, {}, [], () => {}, 'asd'];
        const validSecond = {
            country: 'england',
            league: 'dadadsa',
            season: 1111,
        };

        invalidFirst.forEach((first) => {
            const test = () => {
                parseData(first, validSecond);
            };
            expect(test).to.throw();
        });
    });

    it(`Should throw if the second parameter is 
    an invalid leagueOptions object`, () => {
        const validFirst = '{"asd":"dsa"}';
        const invalidSecond = [1, true, [], {}, () => {}, 'asd'];

        invalidSecond.forEach((second) => {
            const test = () => {
                parseData(validFirst, second);
            };
            expect(test).to.throw();
        });
    });
});
