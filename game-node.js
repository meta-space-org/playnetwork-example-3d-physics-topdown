import node from 'playnetwork/node';
import { workerData } from 'worker_threads';

node.rooms.on('create', async (from, data) => {
    const room = await node.rooms.create(data.levelId, data.tickrate);
    await room.join(from);

    room.on('error', (err) => console.error(err));
});

node.rooms.on('join', async (from, room) => {
    await room.join(from);
});

node.on('error', (err) => console.error(err));

node.start();
