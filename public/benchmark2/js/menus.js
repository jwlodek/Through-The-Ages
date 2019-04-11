var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.MainMenu = function(){};
ThroughTheAges.Help = function(){};
ThroughTheAges.Pause = function(){};
ThroughTheAges.LevelSelect = function(){};

ThroughTheAges.MainMenu.prototype = {
    create: function(){
        console.log("Entered main menu create function");
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'MainMenu');
        this.splash.anchor.setTo(0.5);
        console.log("Background loaded");
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            console.log(this.game.input.activePointer);
        }
    }
};

ThroughTheAges.Help.prototype = {
    create: function(){
        console.log("Entered help create function");
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'Help');
        this.splash.anchor.setTo(0.5);
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.game.state.start('MainMenu');
        }
    }
};

ThroughTheAges.LevelSelect.prototype = {
    create: function(){
        console.log("Entered help create function");
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'LevelSelect');
        this.splash.anchor.setTo(0.5);
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.game.state.start('Game');
        }
    }
};

ThroughTheAges.Pause.prototype = {
    create: function(){
        console.log("Entered pause create function");
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'Help');
        this.splash.anchor.setTo(0.5);
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.game.state.start('Game');
        }
    }
};