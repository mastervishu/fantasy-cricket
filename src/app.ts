import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { db } from './database'
import router from './routes/router'
import { HOST, PORT } from './configuration'
import { loadPlayerData } from './helper'


db();

const app: Express = express();

app.use(bodyParser.json());
app.use('/api', router)

app.listen(PORT, HOST, async () => {
    await loadPlayerData();
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

