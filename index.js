import express from 'express';
import path from 'path';
import * as https from 'https';
import fs from 'fs';

import pn from 'playnetwork';

import FileLevelProvider from './file-level-provider.js';

const app = express();

app.get('/pn.js', (_, res) => {
    res.sendFile(path.resolve('node_modules/playnetwork/dist/pn.js'));
});

const privateKey = fs.readFileSync('./ssl/cert.key', 'utf8');
const certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);
server.listen(parseInt(process.argv[2]) || 8080);

pn.on('room:create', (from, data) => {
    console.log('room:create', from, data);
});

pn.on('room:join', (from, data) => {
    console.log('room:join', from, data);
});

pn.on('room:leave', (from, data) => {
    console.log('room:leave', from, data);
});

await pn.start({
    scriptsPath: 'components',
    templatesPath: 'templates',
    server: server,
    useAmmo: true,
    levelProvider: new FileLevelProvider('levels')
});
