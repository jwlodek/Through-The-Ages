var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Level1 = function() {};
ThroughTheAges.Level2 = function() {};
ThroughTheAges.Level3 = function() {};
ThroughTheAges.Level4 = function() {};


ThroughTheAges.Level1.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Stone Age',  'basictileset_level1', 'benchmark3/assets/tilesets/basictileset_level1.png', 
            'benchmark3/assets/tilesets/ThroughTheAges_Level1.json', 'benchmark3/assets/sounds/Flight_of_the_Crow.mp3', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD('fire', 'pterodactyl');
        this.gameLevel.createItems('fire');
        this.gameLevel.initHome();
        this.gameLevel.initSound();
        //this.gameLevel.spawnEnemies();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        this.gameLevel.releaseEnemies(7, -1.5, 'pterodactyl'); //Initalize enemies
        this.gameLevel.releaseEnemies(3, 1.5, 'pterodactyl'); //Initalize enemies
        //this.gameLevel.spawnEnemies(EnemyActions.Patrol, 20, 'pterodactyl');
        var items = this.gameLevel.collectableGroup;
        items.forEach(element => {
            element.animations.add("animate",[0,1,2,3],20);
            element.animations.play("animate",5,true);
        });
        
    },
    update: function(){
        // Progress to next part of Level?
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.advanceLevel();
            this.gameLevel.stopMusic();
            this.state.start("Level2")
        }
    }
}


ThroughTheAges.Level2.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Middle Aged',  'middleagestileset', 'benchmark3/assets/tilesets/middleagestileset.png', 
            'benchmark3/assets/tilesets/ThroughTheAges_Level2.json', 'benchmark3/assets/sounds/Chivalry_in_All_Things.mp3', this, 2000);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD('fire', 'pterodactyl')
        this.gameLevel.createItems('fire');
        console.log(this.gameLevel.collectableGroup);
        this.gameLevel.initHome();
        //this.gameLevel.spawnEnemies();
        this.gameLevel.initSound();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        //this.gameLevel.releaseEnemies(2,-1.5, 'pterodactyl'); //Initalize enemies
        //this.gameLevel.releaseEnemies(2, 1.5, 'pterodactyl'); //Initalize enemies
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 20, 'pterodactyl');

        var items = this.gameLevel.collectableGroup;
        items.forEach(element => {
            element.animations.add("animate",[0,1,2,3],20);
            element.animations.play("animate",5,true);
        });
    },
    update: function(){
        // Progress to next part of Level?
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.advanceLevel();
            this.gameLevel.stopMusic();
            this.state.start("Level3")
        }
    }
}


ThroughTheAges.Level3.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Forties',  'level3_tiles', 'benchmark3/assets/tilesets/level3_tiles.png', 
            'benchmark3/assets/tilesets/ThroughTheAges_Level3.json', 'benchmark3/assets/sounds/Piccolo_and_a_Cane.mp3', this, 1000);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD('radio', 'pigeon')
        this.gameLevel.createItems('radio');
        this.gameLevel.initHome();
        this.gameLevel.initSound();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        this.gameLevel.releaseEnemies(6,-1.25, 'pigeon'); //Initalize enemies
        //this.gameLevel.releaseEnemies(6, 1.25, 'pterodactyl'); //Initalize enemies
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 20, 'pigeon');
    },
    update: function(){
        this.gameLevel.levelUpdate();
        this.gameLevel.fixLevel3PhysicsIssue();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.advanceLevel();
            this.gameLevel.stopMusic();
            this.state.start("Level4")
        }
    }
}


ThroughTheAges.Level4.prototype = {
    preload: function(){
        this.gameLevel = new GameLevel('The Future', "Level4_tileset (2)", "benchmark3/assets/tilesets/Level4_tileset (2).png", 
        'benchmark3/assets/tilesets/ThroughTheAges_Level4_2.json', 'benchmark3/assets/sounds/Edge_of_Tomorrow.mp3', this, 1000);
        this.gameLevel.loadLevel();
    },
    create: function(){
        //this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD('energon_pod', 'robot_pterodactyl')
        this.gameLevel.createItems('energon_pod');
        this.gameLevel.initHome();
        this.gameLevel.initSound();
        //this.gameLevel.spawnEnemies();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        //this.gameLevel.releaseEnemies(1,-1, 'robot_pterodactyl'); //Initalize enemies
        //this.gameLevel.releaseEnemies(1,1, 'pterodactyl'); //Initalize enemies
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 30, 'robot_pterodactyl');
    },
    update: function(){
        // Progress to next part of Level?
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.advanceLevel();
            this.gameLevel.stopMusic();
            this.state.start("MainMenu")
        }
    }
}