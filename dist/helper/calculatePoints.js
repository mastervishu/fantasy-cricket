"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ playerName, matchData }) => {
    let points = 0;
    const playerData = matchData.filter((entry) => entry.batsman === playerName || entry.bowler === playerName || entry.fielder === playerName);
    playerData.forEach((entry) => {
        if (entry.batsman === playerName) {
            points += entry.runs;
            if (entry.runs === 4)
                points += 1;
            if (entry.runs === 6)
                points += 2;
        }
        if (entry.bowler === playerName) {
            if (entry.wicket)
                points += 25;
            if (entry.wicketType === 'bowled' || entry.wicketType === 'lbw')
                points += 8;
        }
        if (entry.fielder === playerName) {
            if (entry.catch)
                points += 8;
            if (entry.stumping)
                points += 12;
            if (entry.runout)
                points += 6;
        }
    });
    return points;
};
//# sourceMappingURL=calculatePoints.js.map