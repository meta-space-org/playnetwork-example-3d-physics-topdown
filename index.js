import express from 'express';
import path from 'path';
import * as http from 'http';

import pn from 'playnetwork';
import FileLevelProvider from './file-level-provider.js';

const app = express();

app.get('/pn.js', (_, res) => {
    res.sendFile(path.resolve('node_modules/playnetwork/dist/pn.js'));
});

const server = http.createServer(app);
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
