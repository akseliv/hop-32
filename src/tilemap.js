define(['game'],function(game) {
    let tilemap = {
        map: {},
        create: function(){
            this.map = game.get().add.tilemap('tiles');
            this.map.addTilesetImage('redbrick', 'TestTiles');
            this.map.setCollision(1);
            layer = this.map.createLayer('Tile Layer 1');
        },

        get: function(){
            return this.map;
        }

    }
    return tilemap;
});