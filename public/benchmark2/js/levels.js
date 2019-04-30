var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Level1 = function() {};
ThroughTheAges.Level2 = function() {};
ThroughTheAges.Level3 = function() {};
ThroughTheAges.Level4 = function() {};


ThroughTheAges.Level1.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Stone Age',  'basictileset_level1', 'benchmark2/assets/tilesets/basictileset_level1.png', 
            'benchmark2/assets/tilesets/ThroughTheAges_Level1.json', 'benchmark2/assets/sounds/Flight_of_the_Crow.mp3', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD()
        this.gameLevel.createItems('fire');
        this.gameLevel.initHome();
        //this.gameLevel.spawnEnemies();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        //this.gameLevel.releaseEnemies(2, -1.5, 'pterodactyl'); //Initalize enemies
        //this.gameLevel.releaseEnemies(2, 1.5, 'pterodactyl'); //Initalize enemies
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 20, 'pterodactyl');
    },
    update: function(){
        // Progress to next part of Level?
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.stopMusic();
            this.state.start("Level2")
        }
    }
}


ThroughTheAges.Level2.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Middle Aged',  'middleagestileset', 'benchmark2/assets/tilesets/middleagestileset.png', 
            'benchmark2/assets/tilesets/ThroughTheAges_Level2.json', 'benchmark2/assets/sounds/Chivalry_in_All_Things.mp3', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD()
        this.gameLevel.createItems('fire');
        console.log(this.gameLevel.collectableGroup);
        this.gameLevel.initHome();
        //this.gameLevel.spawnEnemies();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        this.gameLevel.releaseEnemies(2,-1.5, 'pterodactyl'); //Initalize enemies
        this.gameLevel.releaseEnemies(2, 1.5, 'pterodactyl'); //Initalize enemies
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 20, 'pterodactyl');
    },
    update: function(){
        // Progress to next part of Level?
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.stopMusic();
            this.state.start("Level3")
        }
    }
}


ThroughTheAges.Level3.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Fabulous 50\'s',  'middleagestileset', 'benchmark2/assets/tilesets/middleagestileset.png', 
            'benchmark2/assets/tilesets/ThroughTheAges_Level2.json', 'benchmark2/assets/sounds/Piccolo_and_a_Cane.mp3', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD()
        this.gameLevel.createItems('radio');
        this.gameLevel.initHome();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        this.gameLevel.releaseEnemies(1.5,-1.25, 'pterodactyl'); //Initalize enemies
        this.gameLevel.releaseEnemies(1.5, 1.25, 'pterodactyl'); //Initalize enemies
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 20, 'pterodactyl');
    },
    update: function(){
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.state.start("Level4")
        }
    }
}


ThroughTheAges.Level4.prototype = {
    preload: function(){
        this.gameLevel = new GameLevel('The Future', "Level4_tileset (2)", "benchmark2/assets/tilesets/Level4_tileset (2).png", 
        'benchmark2/assets/tilesets/ThroughTheAges_Level4_2.json', 'benchmark2/assets/sounds/Edge_of_Tomorrow.mp3', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        //this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD()
        this.gameLevel.createItems('fire');
        this.gameLevel.initHome();
        //this.gameLevel.spawnEnemies();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        this.gameLevel.releaseEnemies(1,-1, 'pterodactyl'); //Initalize enemies
        this.gameLevel.releaseEnemies(1,1, 'pterodactyl'); //Initalize enemies
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 30, 'pterodactyl');
    },
    update: function(){
        // Progress to next part of Level?
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.stopMusic();
            this.state.start("MainMenu")
        }
    }
}