import express from 'express';
import path from 'path';
import * as https from 'https';
import fs from 'fs';

import pn from 'playnetwork';

const app = express();

app.get('/pn.js', (_, res) => {
    res.sendFile(path.resolve('node_modules/playnetwork/dist/pn.js'));
});

const privateKey = fs.readFileSync('./ssl/cert.key', 'utf8');
const certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);
server.listen(8080);

await pn.start({
    scriptsPath: 'components',
    templatesPath: 'templates',
    server: server,
    useAmmo: true,
    nodePath: './game-node.js'
});
