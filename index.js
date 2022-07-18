import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import express from 'express';
import * as https from 'https';

import pn from 'playnetwork';

import FileLevelProvider from './file-level-provider.js';

const app = express();

app.get('/pn.js', (_, res) => {
    res.sendFile(path.resolve('node_modules/playnetwork/dist/pn.js'));
});

const key = fs.readFileSync('./ssl/localhost.key', 'utf8');
const cert = fs.readFileSync('./ssl/localhost.crt', 'utf8');
const credentials = { key, cert };

const server = https.createServer(credentials, app);
server.listen(8080);

await pn.start({
    redisUrl: process.env.REDIS_URL,
    scriptsPath: 'components',
    templatesPath: 'templates',
    server: server,
    useAmmo: true,
    levelProvider: new FileLevelProvider('levels'),
});
