var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.MainMenu = function(){};
ThroughTheAges.Help = function(){};
ThroughTheAges.Pause = function(){};
ThroughTheAges.LevelSelect = function(){};

ThroughTheAges.MainMenu.prototype = {
    create: function(){
        console.log("Entered main menu create function");
        this.background = this.add.image(0, 0, this.game.width, this.game.height, 'MainMenu');
        console.log("Background loaded");
    },
};