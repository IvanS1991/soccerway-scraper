import { Parser } from './data-parser';
import { DataFetcher } from './data-fetcher';

import * as config from './config.json';

import { ILeagueOptions, ILeaguePeriod, ILeagueDataOutput, IConfig } from './models';

export class SoccerwayScraper {
  private parser: Parser;
  private fetcher: DataFetcher;

  constructor(conf: IConfig = config) {
    this.parser = new Parser(conf);
    this.fetcher = new DataFetcher(conf);
  }

  public scrapeOne = (leagueOptions: ILeagueOptions): Promise<ILeagueDataOutput> => {
    return this.fetcher.fetch(leagueOptions)
      .then((leaguePeriodHtml: string) => {
        return this.parser.parsePeriodHtml(leaguePeriodHtml);
      })
      .then((idOptions: ILeaguePeriod) => {
        return this.fetcher.fetch(idOptions);
      })
      .then((leagueDataHtml: string) => {
        return this.parser.parseDataHtml(leagueDataHtml, leagueOptions);
      });
  };

  public scrapeMany (leagueOptions: ILeagueOptions[]): Promise<ILeagueDataOutput[]> {
    const promises: Promise<ILeagueDataOutput>[] = [];

    leagueOptions.forEach((options: ILeagueOptions) => {
      const country: string = options.country;
      const league: string = options.league;
      const season: string = options.season;
      const promise: Promise<ILeagueDataOutput> = this.scrapeOne({ country, league, season });
      promises.push(promise);
    });
    return Promise.all(promises);
  }
}
