"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRouter_1 = __importDefault(require("../auth/authRouter"));
const api = express_1.default();
// middleware
api.use(express_1.default.json());
api.use(body_parser_1.default.json());
api.use(cors_1.default());
api.use(helmet_1.default());
// routers go here
api.use("/api/auth", authRouter_1.default);
api.get('/', (req, res) => {
    res.status(200).json({ api: 'UP' });
});
module.exports = api;
