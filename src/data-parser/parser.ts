import { DataParser } from './data-parser';
import { PeriodParser } from './period-parser';

import { ILeagueOptions, ILeaguePeriod, IConfig, ILeagueDataOutput } from '../models';

export class Parser {
  private dataParser: DataParser;
  private periodParser: PeriodParser;

  constructor (options: IConfig) {
    this.dataParser = new DataParser(options);
    this.periodParser = new PeriodParser(options);
  }

  public parsePeriodHtml (html: string): Promise<ILeaguePeriod> {
    return this.periodParser.parse(html);
  }

  public parseDataHtml (html: string, leagueOptions: ILeagueOptions): Promise<ILeagueDataOutput> {
    return this.dataParser.parseDataHtml(html, leagueOptions);
  }
}
