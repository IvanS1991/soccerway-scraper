import fetch from 'node-fetch';

import { IConfig, DataOptions } from '../models';

export class DataFetcher {
  private config: IConfig;

  constructor (config: IConfig) {
    this.config = config;
  }

  private generateUrl (options: DataOptions): string {
    let url: string;

    if (options.country && options.league && options.season) {
        const season: string = String(options.season) + String(options.season + 1);
        url = `${this.config.BASE_URL}${options.country}/${options.league}/${season}`;
    } else if (options.seasonId && options.roundId) {
        url = this.config.DATA_URL[0] + options.seasonId + this.config.DATA_URL[1]
            + options.roundId + this.config.DATA_URL[2];
    }

    return url;
  }

  public fetch (options: DataOptions) {
      if (typeof options !== 'object' || options === null
          || Array.isArray(options) || options instanceof Function ) {
          throw new Error(this.config.ERR.GET_DATA.INVALID_OPTIONS);
      }

      const url: string = this.generateUrl(options);

      return fetch(url)
          .then((res) => {
              return res.text();
          });
  }
}
