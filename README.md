# PlayNetwork Top-Down Platformer Example

Example project of [PlayNetwork](https://github.com/meta-space-org/playnetwork), implementing multiplayer top-down 3D platformer with physics.

In this example we have:
- Client controlled player capsules.
- Buttons that activate gates.
- Some physics spheres.
- Floor cells that change colors when player steps on them.

Client is authoritative on player capsule, and the rest is server authoritative. Ammo.js physics runs on the server, and replicates simulation on the client with interpolation.

# Demo 🚀

http://topdown-example.meta.space/

# Client Source 🏗

https://playcanvas.com/project/857037/overview/playnetworktopdownexample

# Installation

### Prerequisites

You need to have [Redis installed](https://redis.io/docs/getting-started/installation/) and running.

### Install server-side:

```bash
git clone git@github.com:meta-space-org/playnetwork-example-3d-physics-topdown.git ./example-topdown
cd example-topdown
npm install
cp .env.example .env
```

Fill in .env file with your own data.

You need to create an trust [HTTPS certificate for localhost](https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8)<br />
Place generated `localhost.crt`, and `localhost.key` in the root `ssl` folder.

And now you can run your server:

```bash
npm start
```

Make sure you can access https://localhost:8080/pn.js in your browser.

### Fork the client:

Navigate to https://playcanvas.com/project/857037/overview/playnetworktopdownexample and Fork it.

### Run it:

Open Editor of forked client, select `Lobby` scene. Hit **Launch** 🚀.

# Level Data 🏠

In this example, saving level is implemented as an example to a file using [`FileLevelProvider`](./file-level-provider.js). In your `Lobby` scene, on a root entity, there is a `lobby` script, which has `levelId` attribute. Change that to a level you want to save. To find scene ID: open Scenes Manager, load the scene you need, url: `https://playcanvas.com/editor/scene/1284967` where `1284967` - is your scene ID. Bear in mind: forking a project - updates all scene IDs.

So you can easily edit your scene in the Editor, and save it on the server.

Files in [`/levels/`](./levels/) - are in PlayCanvas scene format, and come with project builds.

# Gameplay Code

All gameplay code is in [`./components/`](./components/) directory. And is just a regular PlayCanvas scripts.

# Debugging

It is possible to use Chrome Inspector for debugging of your back-end code, just like client-side code. To run server in debugging mode:

```bash
npm run debug
```

Navigate to `chrome://inspect`, and wait a few seconds (it takes some time to discover), then you will see your **Target**, click `inspect`.

In **Sources** tab, you can open `Ctrl + O` any file, and use breakpoints. Alternatively you can use `debugger;` keywork in your scripts, to trigger a breakpoint if Inspector is open.

# Hot Reloading

We encourage the use of hot-reloading of gameplay scripts. This allows to reload gameplay scripts on save, so no server restarts are required.

This dramatically improves development speed.

For more details on hot-reloading check out PlayCanvas [User Manual](https://developer.playcanvas.com/en/user-manual/scripting/hot-reloading/).
