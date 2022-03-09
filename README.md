# PlayNetwork Top-Down Platformer Example

Example project of [PlayNetwork](https://github.com/meta-space-org/playnetwork), implementing multiplayer top-down 3D platformer with physics.

In this example we have: client controlled player capsules, buttons that activate gates, some spare spheres, and floor cells that change colors when player steps on them. Client is authoritative on player capsule, and the rest is server authoritative. Running Ammo.js physics on the server, and replicated simulation on the client with interpolation.

# Demo 🚀

http://topdown-example.meta.space/

# Client Source 🏗

https://playcanvas.com/project/857037/overview/playnetworktopdownexample

# Installation

#### Install server-side:

```bash
git clone git@github.com:meta-space-org/playnetwork-example-3d-physics-topdown.git ./example-topdown
cd example-topdown
npm install
npm run start
```

#### Fork the client:

Navigate to https://playcanvas.com/project/857037/overview/playnetworktopdownexample and Fork it.

#### Run it:

Open Editor of forked client, select `Lobby` scene. Hit **Launch** 🚀.

# Level Data 🏠

In this example, saving level is implemented as an example to a file using [`FileLevelProvider`](./file-level-provider.js). In your `Lobby` scene, on a root entity, there is a `lobby` script, which has `levelId` attribute. Change that to a level you want to save. To find scene ID: open Scenes Manager, load the scene you need, url: `https://playcanvas.com/editor/scene/1284967` where `1284967` - is your scene ID. Bear in mind: forking a project - updates all scene IDs.

So you can easily edit your scene in the Editor, and save it on the server.

Files in [`/levels/`](./levels/) - are in PlayCanvas scene format, and come with project builds.
