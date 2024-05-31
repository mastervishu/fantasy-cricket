"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.PORT = exports.HOST = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.HOST = process.env.HOST || 'localhost';
exports.PORT = Number(process.env.POST) || 3000;
exports.MONGODB_URI = process.env.MONGODB_URI || '';
//# sourceMappingURL=index.js.map