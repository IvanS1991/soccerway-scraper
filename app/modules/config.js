const config = {
    BASE_URL: 'http://int.soccerway.com/national/',
    DATA_PATH: 'data/',
    SELECTORS: {
        SEASONID: '#season_id_selector option',
        ROUNDID: '.current a',
        ROWS: '#page_competition_1_block_competition_'
            + 'tables_7_block_competition_wide_table_1_table tbody tr',
        TEAM_NAME: '.team a',
        DATA_COLUMN: 'data-column',
    },
};

module.exports = config;

