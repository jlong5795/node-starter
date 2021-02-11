import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { jwtSecret } from '../config/secrets';

// model import
const Users = require('../users/users-model');
const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        let user = req.body;
        const hash = await bcrypt.hashSync(user.password, 10);
        user.password = hash;

        const newUser = await Users.add(user)
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
            res.status(500).json({ error: "Registration error" });
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        let { username, password } = req.body;
        const user = await Users.findBy({ username }).first();

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);

            res.status(200).json({
                message: `Welcome to the server ${username}!`,
                token
            });
        } else {
            res.status(200).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid Credentials"})
    }
})

const generateToken = (user: User) => {
    const payload = {
        username: user.username
    };

    const options = {
        expiresIn: "12h"
    };

    if (jwtSecret !== undefined) {
        
        return jwt.sign(payload, jwtSecret, options);
    }

};

export default router;