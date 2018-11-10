import { DOM, getDOMDocument } from '../helpers';

import { IConfig, ILeaguePeriod } from '../models';

declare global {
  export interface Element {
    value: string;
  }
}

export class PeriodParser {
  private config: IConfig;
  private dom: DOM;

  private readonly idLen = 5;

  constructor(config: IConfig) {
    this.config = config;
  }

  private parseId (str: string, regex: RegExp): number {
    const index = str.search(regex) + 2;
    return parseInt(str.slice(index, index + this.idLen), 10);
  }

  private get seasonId (): number {
    const seasonId = this.dom.selectElementArray(this.config.SELECTORS.SEASONID)
      .filter((option) => option.getAttribute('selected') === 'selected')
      .map((option) => {
        return this.parseId(option.value, new RegExp(this.config.REGEX.SEASONID));
      })
      .shift();

    return seasonId || null;
  }

  private get roundId (): number {
    const roundId = this.dom.selectElementArray(this.config.SELECTORS.ROUNDID)
      .map((a) => {
        const href = a.getAttribute('href');
        return this.parseId(href, new RegExp(this.config.REGEX.ROUNDID));
      })
      .shift();

    return roundId || null;
  }

  public parse(html: string): Promise<ILeaguePeriod> {
    if (typeof html !== 'string') {
      throw new Error(this.config.ERR.PARSE_ID.INVALID_HTML);
    }

    this.dom = getDOMDocument(html);

    const periodOptions: ILeaguePeriod = {
      seasonId: this.seasonId,
      roundId: this.roundId
    };

    return new Promise((resolve) => {
      resolve(periodOptions);
    });
  }
}
