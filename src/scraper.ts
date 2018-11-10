import { Parser } from './data-parser';
import { DataFetcher } from './data-fetcher';
import { ProcessingQueue } from './processing-queue/processing-queue';

import { config } from './config';

import { ILeagueOptions, ILeaguePeriod, ILeagueDataOutput, IConfig } from './models';

export class SoccerwayScraper {
  private parser: Parser;
  private fetcher: DataFetcher;

  constructor(
    private startYear: number,
    private endYear: number,
    conf: IConfig = config
  ) {
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
    const updatedLeagueOptions: ILeagueOptions[] = leagueOptions.reduce((updated, leagueOptionsObj) => {
      for (let season = this.startYear; season <= this.endYear; season += 1) {
        updated.push({ ...leagueOptionsObj, season });
      }

      return updated;
    }, []);
    const queueLimit = Math.abs(this.endYear - this.startYear);
    const processingFunction = this.scrapeOne;
    const processingQueue = new ProcessingQueue<ILeagueOptions>(queueLimit, processingFunction);

    processingQueue.fill(updatedLeagueOptions);

    return processingQueue.processItems();
  }
}
