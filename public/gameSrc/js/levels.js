/**
 * This file contains the implementations of the level prototype states for 
 * ThroughTheAges. Each Level has a preload, create, and update function.
 * Preload initializes the map and necessary data and creates a GameLevel object.
 * Create initializes some more gameLevel parameters and animations and music, 
 * and finally update contains the main game loop
 * 
 * @author: Jakub Wlodek, Nick Pirrello, Vincent Paladino
 * 
 */

// main game wrapper
var ThroughTheAges = ThroughTheAges || {};

// our four levels
ThroughTheAges.Level1 = function() {};
ThroughTheAges.Level2 = function() {};
ThroughTheAges.Level3 = function() {};
ThroughTheAges.Level4 = function() {};


/**
 * Level one prototype implementation - The stone age
 */
ThroughTheAges.Level1.prototype = {
    preload: function() {
        // create the game level and call load to load images, sprites and music
        this.gameLevel = new GameLevel('The Stone Age',  'basictileset_level1', 'gameSrc/assets/tilesets/basictileset_level1.png', 
            'gameSrc/assets/tilesets/ThroughTheAges_Level1.json', 'gameSrc/assets/sounds/Flight_of_the_Crow.mp3', this);
        this.gameLevel.loadLevel();
    },
    create: function(){
        // setting background images, hud, items. Initialize player, items sound, animations and start releasing enemies
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
        
        // Animated fire item
        var items = this.gameLevel.collectableGroup;
        items.forEach(element => {
            element.animations.add("animate",[0,1,2,3],20);
            element.animations.play("animate",5,true);
        });
        
    },
    update: function(){
        // Level update loops infinitely
        this.gameLevel.levelUpdate();
        // if player collects all items, progress to the next level, and start the next level state
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.advanceLevel();
            this.gameLevel.stopMusic();
            this.state.start("Level2")
        }
    }
}

/**
 * Level two prototype implementation - Medieval times
 */
ThroughTheAges.Level2.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Middle Aged',  'middleagestileset', 'gameSrc/assets/tilesets/middleagestileset.png', 
            'gameSrc/assets/tilesets/ThroughTheAges_Level2.json', 'gameSrc/assets/sounds/Chivalry_in_All_Things.mp3', this, 2000);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD('fire', 'pterodactyl')
        this.gameLevel.createItems('fire');
        console.log(this.gameLevel.collectableGroup);
        this.gameLevel.initHome();
        this.gameLevel.initSound();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();

        // use spawn instead of initialize in order to use AI
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 20, 'pterodactyl');

        var items = this.gameLevel.collectableGroup;
        items.forEach(element => {
            element.animations.add("animate",[0,1,2,3],20);
            element.animations.play("animate",5,true);
        });
    },
    update: function(){
        // Update level on cycle
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Proceed to next level
            this.gameLevel.advanceLevel();
            this.gameLevel.stopMusic();
            this.state.start("Level3")
        }
    }
}

/**
 * Level 3 prototype implementation - Roaring 20s
 */
ThroughTheAges.Level3.prototype = {
    preload: function() {
        this.gameLevel = new GameLevel('The Forties',  'level3_tiles', 'gameSrc/assets/tilesets/level3_tiles.png', 
            'gameSrc/assets/tilesets/ThroughTheAges_Level3.json', 'gameSrc/assets/sounds/Piccolo_and_a_Cane.mp3', this, 1000);
        this.gameLevel.loadLevel();
    },
    create: function(){
        this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD('radio', 'pigeon')
        this.gameLevel.createItems('radio');
        this.gameLevel.initHome();
        this.gameLevel.initSound();
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        // This time combine AI enemies and simple side to side enemies
        this.gameLevel.releaseEnemies(6,-1.25, 'pigeon'); //Initalize enemies
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


/**
 * Level 4 prototype implementation - Future times
 */
ThroughTheAges.Level4.prototype = {
    preload: function(){
        this.gameLevel = new GameLevel('The Future', "Level4_tileset (2)", "gameSrc/assets/tilesets/Level4_tileset (2).png", 
        'gameSrc/assets/tilesets/ThroughTheAges_Level4_2.json', 'gameSrc/assets/sounds/Edge_of_Tomorrow.mp3', this, 1000);
        this.gameLevel.loadLevel();
    },
    create: function(){
        // Problem - Tiled map for level 4 breaks when background is set, should be edited
        //this.gameLevel.setBackgroundImage('sky');
        this.gameLevel.initLayers();
        this.gameLevel.initHUD('energon_pod', 'robot_pterodactyl')
        this.gameLevel.createItems('energon_pod');
        this.gameLevel.initHome();
        this.gameLevel.initSound();
        // Init player after to ensure that they are pushed to the top
        this.gameLevel.initPlayer('gareth');
        this.gameLevel.initAnimations();
        this.gameLevel.spawnEnemies(EnemyActions.Patrol, 30, 'robot_pterodactyl');
    },
    update: function(){
        this.gameLevel.levelUpdate();
        if(this.gameLevel.collectableGroup.children.length == this.gameLevel.itemCounter){
            //Level Won - Last level, so send player to main menu
            // TODO - Add a victory screen state
            this.gameLevel.advanceLevel();
            this.gameLevel.stopMusic();
            this.state.start("MainMenu")
        }
    }
}