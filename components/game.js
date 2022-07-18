var Game = pc.createScript('game');

Game.attributes.add('userTemplate', { type: 'asset', assetType: 'template' });

Game.prototype.initialize = function () {
    this.networkEntities = this.app.room.networkEntities;
    this.users = new Map();

    this.tplUser = this.userTemplate.resource;

    this.app.room.on('join', this.onJoin, this);
    this.app.room.on('leave', this.onLeave, this);

    this.once('destroy', () => {
        this.app.room.off('join', this.onJoin, this);
        this.app.room.off('leave', this.onLeave, this);
    });
};

Game.prototype.swap = function (old) {
    this.networkEntities = old.networkEntities;
    this.users = old.users;

    this.tplUser = old.tplUser;

    old.app.room.off('join', old.onJoin, this);
    old.app.room.off('leave', old.onLeave, this);

    this.app.room.on('join', this.onJoin, this);
    this.app.room.on('leave', this.onLeave, this);
};

Game.prototype.onJoin = function (user) {
    // user entity
    const entity = this.tplUser.instantiate(this.app);
    entity.name = 'User ' + user.id;
    entity.script.networkEntity.owner = user.id;
    this.entity.addChild(entity);
    this.users.set(user.id, entity);
};

Game.prototype.onLeave = function (user) {
    const entity = this.users.get(user.id);
    if (!entity) return;

    entity.destroy();
    this.users.delete(user.id);

    if (this.app.room.users.size === 0) this.app.room.destroy();
};

Game.prototype.toData = function () {
    return {
        users: this.users,
    };
};
