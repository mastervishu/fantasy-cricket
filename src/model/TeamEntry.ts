import { Schema, model } from "mongoose";
import { ITeamEntry } from "../types";

const teamEntrySchema = new Schema<ITeamEntry>({
    teamName: String,
    players: [String],
    captain: String,
    viceCaptain: String,
    points: { type: Number, default: 0 },
});

export default model('TeamEntry', teamEntrySchema)