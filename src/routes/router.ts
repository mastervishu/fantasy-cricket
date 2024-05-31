import { Router, Request, Response } from 'express'
import { Player, TeamEntry } from '../model';
import { IPlayerTeams, IPlayerTypes } from '../types';
import { readFileSync } from 'fs';
import { calculatePoints } from '../helper';
import { join } from 'path';

export class RouterClass {
    public router: Router
    constructor() {
        this.router = Router()
        this.init();
    }

    private init() {
        this.router.post('/add-team', this.addTeam)
        this.router.post('/process-result', this.processResult)
    }

    private async addTeam(req: Request, res: Response) {
        const { teamName, players, captain, viceCaptain } = req.body;

        if (players.length !== 11) {
            return res.status(400).json({ error: 'A team must have exactly 11 players.' });
        }

        const playerTypes: IPlayerTypes = { WK: 0, BAT: 0, AR: 0, BWL: 0 };
        const playerTeams: IPlayerTeams = { RR: 0, CSK: 0 };

        for (const playerName of players) {
            const player = await Player.findOne({ name: playerName });
            if (!player) {
                return res.status(400).json({ error: `Player ${playerName} does not exist.` });
            }
            playerTypes[player.type]++;
            playerTeams[player.team]++;
        }

        if (playerTeams.RR > 10 || playerTeams.CSK > 10) {
            return res.status(400).json({ error: 'A maximum of 10 players can be selected from any one team.' });
        }

        if (playerTypes.WK < 1 || playerTypes.BAT < 1 || playerTypes.AR < 1 || playerTypes.BWL < 1) {
            return res.status(400).json({ error: 'Each type of player must be selected at least once.' });
        }

        const newTeamEntry = new TeamEntry({ teamName, players, captain, viceCaptain });
        await newTeamEntry.save();
        res.status(201).json(newTeamEntry);
    }

    private async processResult(req: Request, res: Response) {
        const filepath: string = join(__dirname, '../../public', 'data/match.json')
        const matchData = JSON.parse(readFileSync(filepath, 'utf8'));

        const teamEntries = await TeamEntry.find();
        for (const teamEntry of teamEntries) {
            let totalPoints = 0;
            for (const playerName of teamEntry.players) {
                let playerPoints = calculatePoints({ playerName, matchData });
                if (playerName === teamEntry.captain) {
                    playerPoints *= 2;
                } else if (playerName === teamEntry.viceCaptain) {
                    playerPoints *= 1.5;
                }
                totalPoints += playerPoints;
            }
            teamEntry.points = totalPoints;
            await teamEntry.save();
        }

        res.status(200).json({ message: 'Match results processed successfully.' });
    }
}

export default new RouterClass().router;