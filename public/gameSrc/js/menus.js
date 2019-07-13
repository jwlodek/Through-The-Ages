/**
 * Expanded definitions of our menu state prototype classes
 * 
 * @author: Jakub Wlodek
 */


// Main game wrapper, and initial state declarations as functions
var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.MainMenu = function(){};
ThroughTheAges.Help = function(){};
ThroughTheAges.Pause = function(){};
ThroughTheAges.LevelSelect = function(){};

/**
 * Main menu prototype function
 */
ThroughTheAges.MainMenu.prototype = {
    create: function(){
        // Basic initialization calls
        this.game.stage.backgroundColor = '#888888';
        this.game.add.sprite(25, 25, 'Logo');
        // The three buttons
        this.PlayButton = this.game.add.button(this.game.world.centerX / 5, this.game.world.centerY, 'MainButton', this.playClick, this, 3, 0, 3);
        this.LevelSelectButton = this.game.add.button(this.game.world.centerX / 5, this.game.world.centerY * 1.25, 'MainButton', this.levelClick, this, 4, 1, 4);
        this.HelpButton = this.game.add.button(this.game.world.centerX / 5, this.game.world.centerY * 1.5, 'MainButton', this.helpClick, this, 5, 2, 5);
    },
    // Event functions for each button click. Simply set the game state
    playClick: function(){
        //console.log('Clicked on play button');
        this.state.start('Level1');
    },
    levelClick: function(){
        this.state.start('LevelSelect');
    },
    helpClick: function(){
        this.state.start('Help');
    }
};

/**
 * Help menu prototype function
 */
ThroughTheAges.Help.prototype = {
    create: function(){
        //console.log('Help menu');
        //Just load the help image
        this.game.stage.backgroundColor = '#DDDDDD';
        this.helpText = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'Help');
        this.helpText.anchor.setTo(0.5, 0.5);
        this.helpText.scale.setTo(0.75, 0.75);
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.state.start('MainMenu');
        }
    }
};

/**
 * Level select prototype function
 */
ThroughTheAges.LevelSelect.prototype = {
    create: function(){
        //console.log("Entered Level Select create function");
        this.game.stage.backgroundColor = '#888888';
        this.game.add.sprite(25, 25, 'Logo');
        // Button for each level
        this.level1Button = this.game.add.button(this.game.world.centerX / 5, this.game.world.centerY * 0.8, 'LevelButton', this.level1Click, this, 4, 0, 4);
        this.level2Button = this.game.add.button(this.game.world.centerX / 5, this.game.world.centerY * 1.05, 'LevelButton', this.level2Click, this, 5, 1, 5);
        this.level3Button = this.game.add.button(this.game.world.centerX / 5, this.game.world.centerY * 1.3, 'LevelButton', this.level3Click, this, 6, 2, 6);
        this.level4Button = this.game.add.button(this.game.world.centerX / 5, this.game.world.centerY * 1.55, 'LevelButton', this.level4Click, this, 7, 3, 7);
    },
    // Level select button event handlers
    level1Click: function(){
        this.state.start('Level1');
    },
    level2Click: function(){
        this.state.start('Level2');
    },
    level3Click: function(){
        this.state.start('Level3');
    },
    level4Click: function(){
        this.state.start('Level4');
    },
};

/**
 * Pause menu prototype - Currently unused - no way to enter ThroughTheAges.Pause state
 */
ThroughTheAges.Pause.prototype = {
    create: function(){
        console.log("Entered pause create function");
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'Help');
        this.splash.anchor.setTo(0.5);
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.state.start('MainMenu');
        }
    }
};