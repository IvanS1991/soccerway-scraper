export interface ILeagueOptions {
  country: string;
  league: string;
  season?: number;
}

export interface ILeaguePeriod {
  seasonId: number;
  roundId: number;
}

export interface DataOptions {
  country?: string;
  league?: string;
  season?: number;
  seasonId?: number;
  roundId?: number;
}
