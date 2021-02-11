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
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../config/secrets");
// model import
const Users = require('../users/users-model');
const router = express_1.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body;
        const hash = yield bcryptjs_1.default.hashSync(user.password, 10);
        user.password = hash;
        const newUser = yield Users.add(user);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration error" });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, password } = req.body;
        const user = yield Users.findBy({ username }).first();
        if (user && bcryptjs_1.default.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome to the server ${username}!`,
                token
            });
        }
        else {
            res.status(200).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Invalid Credentials" });
    }
}));
const generateToken = (user) => {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: "12h"
    };
    if (secrets_1.jwtSecret !== undefined) {
        return jsonwebtoken_1.default.sign(payload, secrets_1.jwtSecret, options);
    }
};
exports.default = router;
