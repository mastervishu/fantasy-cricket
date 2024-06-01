import express, { Express, Response } from 'express'
import bodyParser from 'body-parser'
import { db } from './database'
import router from './routes/router'
import { HOST, PORT } from './configuration'
import { loadPlayerData } from './helper'


db();

const app: Express = express();

app.use(bodyParser.json())
    .use('/health', (_, res: Response) => res.status(200).json({ message: 'OK' }))
    .use('/api', router)

app.listen(PORT, HOST, async () => {
    await loadPlayerData();
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

