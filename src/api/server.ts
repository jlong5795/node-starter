import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyparser from 'body-parser';
import AuthRouter from '../auth/authRouter'
const api = express();

// middleware
api.use(express.json());
api.use(bodyparser.json());
api.use(cors());
api.use(helmet());

// routers go here
api.use("/api/auth", AuthRouter);

api.get('/', (req: Request, res: Response) => {
    res.status(200).json({ api: 'UP'})
})

module.exports = api;