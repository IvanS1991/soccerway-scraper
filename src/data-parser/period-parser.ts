import { JSDOM } from 'jsdom';

import { IConfig, ILeaguePeriod } from '../models';

export class PeriodParser {
  private config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  public parse(html: string): Promise<ILeaguePeriod> {
    if (typeof html !== 'string') {
      throw new Error(this.config.ERR.PARSE_ID.INVALID_HTML);
    }

    const dom: JSDOM = new JSDOM(html, {});
    const window: Window = dom.window;
    const document: Document = window.document;

    const idLen = 5;

    const options: ILeaguePeriod = {
      seasonId: [].slice
        .call(document.querySelectorAll(this.config.SELECTORS.SEASONID))
        .filter((option) => option.getAttribute('selected') === 'selected')
        .map((option) => {
          option = option.value;
          const index = option.search(this.config.REGEX.SEASONID) + 2;
          return parseInt(option.slice(index, index + idLen), 10);
        })[0] || null,
      roundId: [].slice
        .call(document.querySelectorAll(this.config.SELECTORS.ROUNDID))
        .map((a) => {
          const href = a.getAttribute('href');
          const index = href.search(this.config.REGEX.ROUNDID) + 2;
          return parseInt(href.slice(index, index + idLen), 10);
        })[0] || null
    }

    return new Promise((resolve, reject) => {
      resolve(options);
    });
  }
}
