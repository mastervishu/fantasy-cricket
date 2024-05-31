import { Schema, model } from "mongoose";
import { IPlayer } from "../types";

const playerSchema = new Schema<IPlayer>({
    name: String,
    type: String,
    team: String,
});

export default model('Player', playerSchema)