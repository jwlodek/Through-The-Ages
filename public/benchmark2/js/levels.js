var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Level1 = function() {};
ThroughTheAges.Level2 = function() {};
ThroughTheAges.Level3 = function() {};
ThroughTheAges.Level4 = function() {};


ThroughTheAges.Level1.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Stone Age', {}, [], this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.game.world.setBounds(0, 0, 1920, 1080);
        
        
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('basictileset_level1','tiles');

        this.backgroundLayer = this.map.createLayer('BackgroundLayer');
        this.platformLayer = this.map.createLayer('Platform Layer');
        this.itemLayer = this.map.createLayer('ItemLayer');
        this.homeBaseLayer = this.map.createLayer('HomeBaseLayer');
        this.playerLayer = this.map.createLayer('Player Layer');

        //var playerPos = this.gameLevel.findObjectsByType('')

        this.map.setCollisionBetween(1, 100000, true, 'Platform Layer');
        
    },
    update: function(){
        // Progress to next part of Level?
        this.gameLevel.levelUpdate();
    }
}


ThroughTheAges.Level2.prototype = {
    create: function(){
        this.gameLevel = new GameLevel('Middle Ages', {}, [], this);
    },
    update: function(){
        this.gameLevel.levelUpdate();
    }
}


ThroughTheAges.Level3.prototype = {
    create: function(){
        this.gameLevel = new GameLevel('Present Day', {}, [], this);
    },
    update: function(){
        this.gameLevel.levelUpdate();
    }
}


ThroughTheAges.Level4.prototype = {
    create: function(){
        this.gameLevel = new GameLevel('Future', {}, [], this);
    },
    update: function(){

    }
}