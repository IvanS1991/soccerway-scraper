const constants = {
    BASE_URL: 'http://int.soccerway.com/national/',
    DATA_URL: ['http://int.soccerway.com/a/block_competition_tables?block_id=page_competition_1_block_competition_tables_7&callback_params={"season_id":', ',"round_id":', ',"outgroup":false,"competition_id":8,"new_design_callback":false}&action=changeTable&params={"type":"competition_wide_table"}'],
    REGEX: {
        SEASONID: /\/s[0-9]/,
        ROUNDID: /\/r[0-9]/,
    },
    SELECTORS: {
        SEASONID: '#season_id_selector option',
        ROUNDID: '.current a',
        ROWS: '#page_competition_1_block_competition_'
            + 'tables_7_block_competition_wide_table_1_table tbody tr',
        TEAM_NAME: '.team a',
    },
    ERR: {
        GET_DATA: {
            INVALID_OPTIONS: 'you must pass an options'
                + ' object as the first parameter',
        },
        PARSE_DATA: {
            INVALID_DATA: 'you must pass a string '
                + 'as the first parameter',
            INVALID_OPTIONS: 'you must pass a valid '
                + 'leagueOptions object',
        },
        PARSE_ID: {
            INVALID_HTML: 'you must pass a valid html as the only parameter',
        },
    },
};

module.exports = constants;

