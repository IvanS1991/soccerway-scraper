export interface IConfig {
  BASE_URL: string;
  DATA_URL: string[];
  REGEX: {
    SEASONID: string;
    ROUNDID: string;
  };
  SELECTORS: {
    SEASONID: string;
    ROUNDID: string;
    ROWS: string;
    TEAM_NAME: string;
  };
  ERR: {
    GET_DATA: {
      INVALID_OPTIONS: string
    };
    PARSE_DATA: {
      INVALID_DATA: string;
      INVALID_OPTIONS: string
    };
    PARSE_ID: {
      INVALID_HTML: string;
    }
  };
}
