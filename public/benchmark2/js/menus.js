var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.MainMenu = function(){};
ThroughTheAges.Help = function(){};
ThroughTheAges.Pause = function(){};
ThroughTheAges.LevelSelect = function(){};

ThroughTheAges.MainMenu.prototype = {
    create: function(){
        this.background = this.game.add.image(0, 0, this.game.width, this.game.height, 'MainMenu');
    },
};