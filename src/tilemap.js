define(function() {
    let tilemap = {
        create: function(game){
            map = game.add.tilemap('tiles');
            map.addTilesetImage('redbrick', 'TestTiles');
            map.setCollision(1);
            layer = map.createLayer('Tile Layer 1');
        }
    }
    return tilemap;
});