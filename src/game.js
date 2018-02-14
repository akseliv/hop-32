define(['require'],function(require) {
    let gameObject;
    let game = {
        create: function(){
            let main = require('main');

            gameObject = new Phaser.Game(640, 360, Phaser.CANVAS, 'phaser-example', { preload: main.preload, create: main.create, update: main.update,render: main.render });

        },

        get: function() {
            return gameObject;
        }

    }

    return game;


});

