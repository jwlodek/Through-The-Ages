var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Level1 = function() {};
ThroughTheAges.Level2 = function() {};
ThroughTheAges.Level3 = function() {};
ThroughTheAges.Level4 = function() {};


ThroughTheAges.Level1.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Stone Age',  'basictileset_level1', 'benchmark2/assets/tilesets/basictileset_level1.png', 
            'benchmark2/assets/tilesets/ThroughTheAges_Level1.json', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.initLayers();
        this.gameLevel.initHUD()
        this.gameLevel.createItems();
        this.gameLevel.initHome();
        //this.gameLevel.spawnEnemies();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        this.gameLevel.releaseEnemies(3,-1.5, 'pterodactyl'); //Initalize enemies
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