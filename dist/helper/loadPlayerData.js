"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson_1 = __importDefault(require("csvtojson"));
const model_1 = require("../model");
const path_1 = require("path");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const filepath = (0, path_1.join)(__dirname, '../../public', 'data/players.csv');
    const players = (yield (0, csvtojson_1.default)().fromFile(filepath)).map(({ Player, Team, Role }) => ({ name: Player, type: Role, team: Team }));
    const playerLength = yield model_1.Player.estimatedDocumentCount();
    if (playerLength < players.length)
        yield model_1.Player.insertMany(players);
});
//# sourceMappingURL=loadPlayerData.js.map