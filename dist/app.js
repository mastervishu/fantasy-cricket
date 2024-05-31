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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./database");
const router_1 = __importDefault(require("./routes/router"));
const configuration_1 = require("./configuration");
const helper_1 = require("./helper");
(0, database_1.db)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/', router_1.default);
app.listen(configuration_1.PORT, configuration_1.HOST, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helper_1.loadPlayerData)();
    console.log(`Server is running on http://${configuration_1.HOST}:${configuration_1.PORT}`);
}));
//# sourceMappingURL=app.js.map