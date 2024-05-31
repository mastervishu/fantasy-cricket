"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamEntrySchema = new mongoose_1.Schema({
    teamName: String,
    players: [String],
    captain: String,
    viceCaptain: String,
    points: { type: Number, default: 0 },
});
exports.default = (0, mongoose_1.model)('TeamEntry', teamEntrySchema);
//# sourceMappingURL=TeamEntry.js.map