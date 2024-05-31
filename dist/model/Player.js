"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const playerSchema = new mongoose_1.Schema({
    name: String,
    type: String,
    team: String,
});
exports.default = (0, mongoose_1.model)('Player', playerSchema);
//# sourceMappingURL=Player.js.map