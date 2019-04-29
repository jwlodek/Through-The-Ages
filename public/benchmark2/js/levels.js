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
        this.gameLevel.setBackgroundImage('sky');
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
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.state.start("Level2")
        }
    }
}


ThroughTheAges.Level2.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Middle Aged',  'middleagestileset', 'benchmark2/assets/tilesets/middleagestileset.png', 
            'benchmark2/assets/tilesets/ThroughTheAges_Level2.json', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
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


ThroughTheAges.Level3.prototype = {
    create: function(){
        this.gameLevel = new GameLevel('Present Day', {}, [], this);
    },
    update: function(){
        this.gameLevel.levelUpdate();
    }
}


ThroughTheAges.Level4.prototype = {
    preload: function(){
        this.gameLevel = new GameLevel('The Future', "Level4_tileset (2)", "benchmark2/assets/tilesets/Level4_tileset (2).png", 
        'benchmark2/assets/tilesets/ThroughTheAges_Level4_2.json', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
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