import fetch from 'node-fetch';

import { IConfig, DataOptions } from '../models';

export class DataFetcher {
  private config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  private seasonString(season: number): string {
    return String(season) + String(season + 1);
  }

  private generateUrl({ country, league, season, seasonId, roundId }: DataOptions): string {
    if (country && league && season) {
      return `${this.config.BASE_URL}${country}/${league}/${this.seasonString(season)}`;
    }

    return `${this.config.DATA_URL[0]}${seasonId}${this.config.DATA_URL[1]}${roundId}${this.config.DATA_URL[2]}`;
  }

  public fetch(options: DataOptions) {
    if (typeof options !== 'object' || options === null
      || Array.isArray(options) || options instanceof Function) {
      throw new Error(this.config.ERR.GET_DATA.INVALID_OPTIONS);
    }

    const url: string = this.generateUrl(options);

    return fetch(url)
      .then((res) => {
        return res.text();
      });
  }
}
