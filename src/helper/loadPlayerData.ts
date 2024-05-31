import csvtojson from 'csvtojson'
import { Player } from '../model';
import { join } from 'path';
import { IPlayer } from '../types';

interface IPlayerFile {
    Player: string;
    Team: string;
    Role: string;
}
export default async () => {
    const filepath: string = join(__dirname, '../../public', 'data/players.csv')
    const players: IPlayer[] = (await csvtojson().fromFile(filepath)).map(({ Player, Team, Role }: IPlayerFile) => ({ name: Player, type: Role, team: Team }));
    const playerLength = await Player.estimatedDocumentCount();
    if (playerLength < players.length) await Player.insertMany(players);
};