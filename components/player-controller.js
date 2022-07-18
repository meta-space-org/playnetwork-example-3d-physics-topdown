var PlayerController = pc.createScript('playerController');

PlayerController.attributes.add('speed', { type: 'number' });
PlayerController.attributes.add('jumpForce', { type: 'number', default: 1500 });

PlayerController.prototype.initialize = function () {
    this.user = this.entity.networkEntity.user;

    if (!this.user) return;

    this.entity.networkEntity.on('input', this.setInput, this);
    this.user.once('leave', this.removeInputHandler, this);
    this.once('destroy', this.removeInputHandler, this);
};

PlayerController.prototype.swap = function (old) {
    this.user = old.user;

    if (old.user) {
        old.user.off('input', old.setInput, old);
        old.user.off('leave', old.removeInputHandler, old);
        old.off('destroy', old.removeInputHandler, old);
    }

    if (this.user) {
        this.user.on('input', this.setInput, this);
        this.user.once('leave', this.removeInputHandler, this);
        this.once('destroy', this.removeInputHandler, this);
    }
};

PlayerController.prototype.setInput = function (sender, data) {
    if (sender !== this.user) return;

    this.entity.rigidbody.teleport(data.position.x, data.position.y, data.position.z);
    this.entity.rigidbody.linearVelocity = this.entity.rigidbody.linearVelocity.set(data.linearVelocity.x, data.linearVelocity.y, data.linearVelocity.z);
    this.entity.rigidbody.angularVelocity = this.entity.rigidbody.angularVelocity.set(data.angularVelocity.x, data.angularVelocity.y, data.angularVelocity.z);
};

PlayerController.prototype.removeInputHandler = function () {
    this.user.off('input', this.setInput, this);
};

PlayerController.prototype.update = function () {
    // respawn if fell below the floor
    if (this.entity.getPosition().y < -4) {
        this.entity.setPosition(0, 4, 0);
        this.entity.rigidbody.teleport(0, 0, 0);
        this.entity.rigidbody.linearVelocity = this.entity.rigidbody.linearVelocity.set(0, 0, 0);
    }
};
