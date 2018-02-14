define(['game'],function(game) {

    let player = {
        cursors: {},
        sprite: {},
        playerRides: false,
        playerRidesLastFrame: false,
        deathFlag: false,
        kcheck: false,
        heading: {},
        keyDelayFrames: 0,
        keyDelayFramesCount: -10,
        frames: 0,
        framesCount: -10,
        lastKey: false,
        lastKeyReleased: false,
        leapDistance: 32,
        snapGrid: 32,

        create: function(){
            
            this.sprite = game.get().add.sprite(32, 288, 'player');
            this.sprite.smoothed = false;
            game.get().physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.collideWorldBounds=true;

            this.cursors = game.get().input.keyboard.createCursorKeys();
        },

        update: function(){
            // resets
            player.tint = 0xffffff;
            // collisions
            /*game.physics.arcade.collide(player, layer,function(player, layer){
                frames = 0;
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            });*/

            var playerRideLastFrame = (playerRides) ? true: false;
            playerRides = false;
            var overlaps = [];

            /*platforms.map(function(plat){
                game.physics.arcade.overlap(player,plat,function(player, platform){
                    overlaps.push(platform);
                    if(!playerRides && player.body.velocity.x === 0 && player.body.velocity.y === 0 && player.body.x === platform.body.x && player.body.y === platform.body.y){
                        platform.body.velocity.x = 128;
                        playerRides = platform;
                        deathFlag = false;
                        console.log('entered platform');

                    }
                });
                game.physics.arcade.collide(plat, layer,function(platform, layer){
                    platform.destroy();
                })


            });*/

            if(!playerRides && deathFlag){
                player.destroy();
            }
            if(playerRideLastFrame && overlaps.length === 0){
                console.log('exited platform');
            }


            if(playerRides){
                player.body.velocity.x = playerRides.body.velocity.x;
                player.body.velocity.y = playerRides.body.velocity.y;
            }
            
            if(frames === 0){

                heading = {};
                snapToGrid();
                frames = false;
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                var landingTile = map.getTileWorldXY(player.body.x,player.body.y,32,32,layer);
                if(!landingTile){
                    console.log("death flag set");
                    deathFlag = true;
                }
                console.log("x:"+player.body.x,"y:"+player.body.y);
                console.log("landed");

            }

            if(cursors.left.isDown && kcheck){

                heading = {x:-1, y: false}
                kcheck = false;
                frames = frameCount;
                keyDelayFrames = keyDelayFramesCount;
                lastKey = cursors.left;

            } else if (cursors.right.isDown && kcheck){

                heading = {x: 1, y: false}
                kcheck = false;
                frames = frameCount;
                keyDelayFrames = keyDelayFramesCount;
                lastKey = cursors.right;

            } else if (cursors.up.isDown && kcheck){

                heading = {x: false, y: -1}
                kcheck = false;
                frames = frameCount;
                keyDelayFrames = keyDelayFramesCount;
                lastKey = cursors.up;

            } else if (cursors.down.isDown && kcheck){

                heading = {x: false, y: 1}
                kcheck = false;
                frames = frameCount;
                keyDelayFrames = keyDelayFramesCount;
                lastKey = cursors.down;

            }

            if(!frames && keyDelayFrames){
                keyDelayFrames++;
            }
            if((lastKey && keyDelayFrames === 0)){
                keyDelayFrames = false;
                kcheck = true;
            }
            if((lastKey.isUp && frames < -1 && !kcheck)){
                keyDelayFrames = false;
                kcheck = true;
                console.log('timed');
                player.tint = 0xfff333;
            }


            if(typeof heading.x == 'number' && frames < 0){
                var rideVelocity = (playerRides) ? playerRides.body.velocity.x : 0;
                player.body.velocity.x = rideVelocity+((leapDistance)*(60/-frameCount))*60*deltaTime*heading.x;
                frames++;
            }
            if(typeof heading.y == 'number' && frames < 0){
                var rideVelocity = (playerRides) ? playerRides.body.velocity.y : 0;
                player.body.velocity.y = ((leapDistance+rideVelocity)*(60/-frameCount))*60*deltaTime*heading.y;
                frames++;
            }
        }

    }

    return player;
});