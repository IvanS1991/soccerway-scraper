import { IConfig, ILeagueOptions } from './models';

export const config: IConfig = {
  "BASE_URL": "http://int.soccerway.com/national/",
  "DATA_URL": [
    "http://int.soccerway.com/a/block_competition_tables?block_id=page_competition_1_block_competition_tables_7&callback_params={\"season_id\":",
    ",\"round_id\":",
    ",\"outgroup\":false,\"competition_id\":8,\"new_design_callback\":false}&action=changeTable&params={\"type\":\"competition_wide_table\"}"
  ],
  "REGEX": {
    "SEASONID": "/s[0-9]",
    "ROUNDID": "/r[0-9]"
  },
  "SELECTORS": {
    "SEASONID": "#season_id_selector option",
    "ROUNDID": ".current a",
    "ROWS": "#page_competition_1_block_competition_tables_7_block_competition_wide_table_1_table tbody tr",
    "TEAM_NAME": ".team a"
  },
  "ERR": {
    "GET_DATA": {
      "INVALID_OPTIONS": "you must pass an options object as the first parameter"
    },
    "PARSE_DATA": {
      "INVALID_DATA": "you must pass a string as the first parameter",
      "INVALID_OPTIONS": "you must pass a valid leagueOptions object"
    },
    "PARSE_ID": {
      "INVALID_HTML": "you must pass a valid html as the only parameter"
    }
  }
};

export const leagues: ILeagueOptions[] = [
  { country: 'england', league: 'premier-league' },
  { country: 'england', league: 'championship' },
  { country: 'england', league: 'league-one' },
  { country: 'england', league: 'league-two' },
  { country: 'germany', league: 'bundesliga' },
  { country: 'germany', league: '2-bundesliga' },
  { country: 'germany', league: '3-liga' },
  { country: 'germany', league: 'regionalliga' },
  { country: 'italy', league: 'serie-a' },
  { country: 'italy', league: 'serie-b' },
  { country: 'spain', league: 'primera-division' },
  { country: 'spain', league: 'segunda-division' },
  { country: 'france', league: 'ligue-1' },
  { country: 'france', league: 'ligue-2' }
];
