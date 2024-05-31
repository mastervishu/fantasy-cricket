export interface IPlayer {
    name: string;
    type: string;
    team: string;
}

export interface ITeamEntry {
    teamName: string;
    players: string[];
    captain: string;
    viceCaptain: string;
    points: number;
}

export interface IPlayerTypes {
    [key: string]: number;
}

export interface IPlayerTeams {
    [key: string]: number;
}