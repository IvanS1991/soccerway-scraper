import { JSDOM } from 'jsdom';

import { IConfig, ILeagueDataOutput, ILeagueOptions, ITeamStats } from '../models';

export class DataParser {
  private config: IConfig

  constructor (config: IConfig) {
    this.config = config;
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

      const html: string = JSON.parse(data).commands[0].parameters.content;

      const dom: JSDOM = new JSDOM(html, {});
      const window: Window = dom.window;
      const document: Document = window.document;

      const rows: HTMLElement[] = [].slice.call(document.querySelectorAll(this.config.SELECTORS.ROWS));

      rows.forEach((row) => {
          const team: ITeamStats = {
              teamName: row.querySelector(this.config.SELECTORS.TEAM_NAME)
                  .getAttribute('title'),
              stats: {},
          };
          const cells: HTMLElement[] = [].slice.call(row.children)
              .slice(3);
          cells.forEach((cell) => {
              const label: string = [].slice.call(cell.classList)
                  .slice(-1)[0];
              team.stats[label] = parseInt(cell.innerHTML, 10);
          });
          league.teams.push(team);
      });

      return new Promise((resolve, reject) => {
          resolve(league);
      });
  }
}
