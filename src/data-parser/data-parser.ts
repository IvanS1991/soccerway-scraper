import { getDOMDocument, DOM } from '../helpers';
import { IConfig, ILeagueDataOutput, ILeagueOptions, ITeamStats } from '../models';

export class DataParser {
  private config: IConfig
  private dom: DOM;

  constructor (config: IConfig) {
    this.config = config;
  }

  private getTeamStats (row: Element): { [key: string]: number } {
    const stats: { [key: string]: number } = {}
    const cells: Element[] = this.dom.getElementArray(row.children).slice(3);

    cells.forEach((cell: Element) => {
        const label: string = [].slice.call(cell.classList).slice(-1)[0];
        
        stats[label] = parseInt(cell.innerHTML, 10);
    });

    return stats;
  }

  public parseDataHtml (data: string, leagueOptions: ILeagueOptions): Promise<ILeagueDataOutput> {
      if (typeof data !== 'string') {
          throw new Error(this.config.ERR.PARSE_DATA.INVALID_DATA);
      }
      if (typeof leagueOptions !== 'object'
          || !leagueOptions.hasOwnProperty('country')
          || !leagueOptions.hasOwnProperty('league')
          || !leagueOptions.hasOwnProperty('season')) {
              throw new Error(this.config.ERR.PARSE_DATA.INVALID_OPTIONS);
          }

      const league: ILeagueDataOutput = {
          country: leagueOptions.country,
          league: leagueOptions.league,
          season: leagueOptions.season,
          teams: [],
      };

      this.dom = getDOMDocument(data);

      const rows: Element[] = this.dom.selectElementArray(this.config.SELECTORS.ROWS);

      league.teams = rows.reduce((teams, row) => {
        const team: ITeamStats = {
          teamName: this.dom.getAttributeOf(this.config.SELECTORS.TEAM_NAME, 'title', row),
          stats: this.getTeamStats(row),
        };

        teams.push(team);

        return teams;
      }, league.teams);

      return new Promise((resolve) => {
          resolve(league);
      });
  }
}
