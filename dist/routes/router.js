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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterClass = void 0;
const express_1 = require("express");
const model_1 = require("../model");
const fs_1 = require("fs");
const helper_1 = require("../helper");
const path_1 = require("path");
class RouterClass {
    constructor() {
        this.router = (0, express_1.Router)();
        this.init();
    }
    init() {
        this.router.post('/add-team', this.addTeam);
        this.router.post('/process-result', this.processResult);
    }
    addTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { teamName, players, captain, viceCaptain } = req.body;
            if (players.length !== 11) {
                return res.status(400).json({ error: 'A team must have exactly 11 players.' });
            }
            const playerTypes = { WK: 0, BAT: 0, AR: 0, BWL: 0 };
            const playerTeams = { RR: 0, CSK: 0 };
            for (const playerName of players) {
                const player = yield model_1.Player.findOne({ name: playerName });
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
            const newTeamEntry = new model_1.TeamEntry({ teamName, players, captain, viceCaptain });
            yield newTeamEntry.save();
            res.status(201).json(newTeamEntry);
        });
    }
    processResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = (0, path_1.join)(__dirname, '../../public', 'data/match.json');
            const matchData = JSON.parse((0, fs_1.readFileSync)(filepath, 'utf8'));
            const teamEntries = yield model_1.TeamEntry.find();
            for (const teamEntry of teamEntries) {
                let totalPoints = 0;
                for (const playerName of teamEntry.players) {
                    let playerPoints = (0, helper_1.calculatePoints)({ playerName, matchData });
                    if (playerName === teamEntry.captain) {
                        playerPoints *= 2;
                    }
                    else if (playerName === teamEntry.viceCaptain) {
                        playerPoints *= 1.5;
                    }
                    totalPoints += playerPoints;
                }
                teamEntry.points = totalPoints;
                yield teamEntry.save();
            }
            res.status(200).json({ message: 'Match results processed successfully.' });
        });
    }
}
exports.RouterClass = RouterClass;
exports.default = new RouterClass().router;
//# sourceMappingURL=router.js.map