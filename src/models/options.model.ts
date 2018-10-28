export interface ILeagueOptions {
  country: string;
  league: string;
  season: string;
}

export interface ILeaguePeriod {
  seasonId: string;
  roundId: string;
}

export type DataOptions = {
  country?: string;
  league?: string;
  season?: string;
  seasonId?: string;
  roundId?: string;
};
