var PlayerController = pc.createScript('playerController');

PlayerController.attributes.add('speed', { type: 'number' });
PlayerController.attributes.add('jumpForce', { type: 'number', default: 1500 });

PlayerController.prototype.initialize = function() {
    this.player = this.entity.networkEntity.player;

    if (!this.player) return;

    this.player.on('input', this.setInput, this);
    this.player.once('leave', this.removeInputHandler, this);
    this.once('destroy', this.removeInputHandler, this);
};

PlayerController.prototype.swap = function(old) {
    this.player = old.player;

    if (old.player) {
        old.player.off('input', old.setInput, old);
        old.player.off('leave', old.removeInputHandler, old);
        old.off('destroy', old.removeInputHandler, old);
    }

    if (this.player) {
        this.player.on('input', this.setInput, this);
        this.player.once('leave', this.removeInputHandler, this);
        this.once('destroy', this.removeInputHandler, this);
    }
};

PlayerController.prototype.setInput = function(from, data) {
    if (from !== this.player) return;

    this.entity.rigidbody.teleport(data.position.x, data.position.y, data.position.z);
    this.entity.rigidbody.linearVelocity = this.entity.rigidbody.linearVelocity.set(data.linearVelocity.x, data.linearVelocity.y, data.linearVelocity.z);
    this.entity.rigidbody.angularVelocity = this.entity.rigidbody.angularVelocity.set(data.angularVelocity.x, data.angularVelocity.y, data.angularVelocity.z);
};

PlayerController.prototype.removeInputHandler = function() {
    this.player.off('input', this.setInput, this);
};

PlayerController.prototype.update = function() {
    // respawn if fell below the floor
    if (this.entity.getPosition().y < -4) {
        this.entity.setPosition(0, 4, 0);
        this.entity.rigidbody.teleport(0, 0, 0);
        this.entity.rigidbody.linearVelocity = this.entity.rigidbody.linearVelocity.set(0, 0, 0);
    }
};
