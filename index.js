import express from 'express';
import path from 'path';
import * as https from 'https';
import fs from 'fs';

import pn from 'playnetwork';
import FileLevelProvider from './file-level-provider.js';

const app = express();

app.get('/pn.js', (_, res) => {
    res.sendFile(path.resolve('C:/Projects/playcanvas-server-boilerplate/dist/pn.js'));
});

const privateKey = fs.readFileSync('./ssl/cert.key', 'utf8');
const certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);
server.listen(8080);

await pn.initialize({
    levelProvider: new FileLevelProvider('./levels'),
    scriptsPath: './components',
    templatesPath: './templates',
    server: server
});

pn.rooms.on('create', async (from, data) => {
    const room = await pn.rooms.create(data.levelId, data.tickrate);
    room.join(from);
});

pn.rooms.on('join', async (from, room) => {
    room.join(from);
});
