define(['require', 'player', 'tilemap', 'platform'],function(require, player, tilemap, platform){
    let main = {
        game: require('game'),
        preload: function(){
            //let game = require('game').get();
            this.game.load.image('player', 'sprites/player.png');
            this.game.load.image('platform', 'sprites/platform.png');
            this.game.load.image('TestTiles', 'sprites/test-tiles.png');
            this.game.load.tilemap('tiles', 'tilemaps/test.json?'+Date.now(), null, Phaser.Tilemap.TILED_JSON);
        },

        create: function(){
            tilemap.create();
            player.create(32,288);
            let plat = platform.create();
            console.log(plat);
            this.game.time.advancedTiming = true;    
            PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);


        },

        update: function(){
            // get dT
            deltaTime = this.game.time.elapsed/1000;
        },

        render: function(){
            this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        }

    }
    return main;
});

