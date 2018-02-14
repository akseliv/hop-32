define(['game'],function(game) {
    let platform = {
        sprite: {},
        create: function(x,y){
            this.sprite = game.get().add.sprite(x, y, 'platform');
            this.sprite.smoothed = false;
            game.get().physics.enable(this.sprite, Phaser.Physics.ARCADE);
            return platform;
        }

    }
    return platform;
});