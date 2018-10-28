const { expect } = require('chai');

const { parseId, parseData, getData } = require('../dist/modules');
const { scrapeOne, scrapeMany } = require('../dist');

describe('getData tests', () => {
    it('Should throw if the first parameter is not an object', () => {
        const invalidParams = [1, true, null, [], () => { }, 'asd'];
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
        const invalidFirst = [1, true, {}, [], () => { }, 'asd'];
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
            const invalidSecond = [1, true, [], {}, () => { }, 'asd'];

            invalidSecond.forEach((second) => {
                const test = () => {
                    parseData(validFirst, second);
                };

                expect(test).to.throw();
            });
        });
});

describe('scrapeOne tests', () => {
    let validOptions;
    let expected;

    beforeEach(() => {
        validOptions = {
            country: 'england',
            league: 'premier-league',
            season: 2015,
        };

        expected = {
            country: validOptions.country,
            league: validOptions.league,
            season: validOptions.season,
            teamsLength: 20,
        };
    });

    it('Should return a promise', () => {
        const result = scrapeOne(validOptions);

        expect(result).to.be.an.instanceof(Promise);
    });

    it('Should resolve with an object', (done) => {
        scrapeOne(validOptions)
            .then((result) => {
                expect(result).to.be.an('object');
            })
            .then(done, done);
    });

    it(`The output object should have properties 
        - country(string), league(string), 
        season(number) and teams(array)`, (done) => {
        scrapeOne(validOptions)
            .then((result) => {
                expect(result).to.have.property('country');
                expect(result.country).to.be.a('string');

                expect(result).to.have.property('league');
                expect(result.league).to.be.a('string');

                expect(result).to.have.property('season');
                expect(result.season).to.be.a('number');

                expect(result).to.have.property('teams');
                expect(result.teams).to.be.an('array');
            })
            .then(done, done);
    });

    describe('result.teams tests', () => {
        it('Should have length of 20', (done) => {
            scrapeOne(validOptions)
                .then((result) => {
                    expect(result.teams).to.have.length(expected.teamsLength);
                })
                .then(done, done);
        });

        it(`Every member should have properties
            - teamName(string) and stats(object)`, (done) => {
            scrapeOne(validOptions)
                .then((result) => {
                    const teams = result.teams;
                    teams.forEach((team) => {
                        expect(team).to.have.property('teamName');
                        expect(team.teamName).to.be.a('string');
                        expect(team).to.have.property('stats');
                        expect(team.stats).to.be.an('object');
                    });
                })
                .then(done, done);
        });
    });
});

describe('scrapeMany tests', () => {
    let validOptions;
    let expectedLength;

    beforeEach(() => {
        validOptions = [
            {
                country: 'england',
                league: 'premier-league',
                season: 2016,
            },
            {
                country: 'germany',
                league: 'bundesliga',
                season: 2016,
            },
            {
                country: 'france',
                league: 'ligue-1',
                season: 2016,
            },
        ];

        expectedLength = [].slice.call(validOptions).length;
    });

    it('Should return a promise', () => {
        const result = scrapeMany(validOptions);

        expect(result).to.be.an.instanceof(Promise);
    });

    it('Should resolve with an array of objects', (done) => {
        scrapeMany(validOptions)
            .then((result) => {
                expect(result).to.be.an('array');
                expect(result).to.have.length(expectedLength);
                result.forEach((member) => {
                    expect(member).to.be.an('object');
                });
            })
            .then(done, done);
    });
});
