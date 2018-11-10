export interface ITeamStats {
  teamName: string;
  stats: {
    [key: string]: number;
  };
}

export interface ILeagueDataOutput {
  country: string;
  league: string;
  season: number;
  teams: ITeamStats[];
}
