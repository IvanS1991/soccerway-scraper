import { Parser } from './data-parser';
import { DataFetcher } from './data-fetcher';

import { config } from './config';

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
      promises.push(this.scrapeOne(options));
    });
    return Promise.all(promises);
  }
}
