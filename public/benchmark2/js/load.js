var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Load = function() {};

ThroughTheAges.Load.prototype = {
    preload: function(){
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash');
        this.splash.anchor.setTo(0.5);

        //load all sprites and images and spritesheets here
        this.load.image('MainMenu', 'Main Menu.png');
        this.load.image('Help', 'User_Help_Menu.png');
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.state.start('MainMenu');
        }
    }
};