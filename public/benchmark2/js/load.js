var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Load = function() {};

ThroughTheAges.Load.prototype = {
    preload: function(){
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash');
        this.splash.anchor.setTo(0.5);

        //load all sprites and images and spritesheets here
        this.load.image('MainMenu', 'Main Menu.png');
        this.load.image('Help', 'Help Text.png');
        this.load.image('Logo', 'Logo_Small.png');
        this.load.image('spear', 'benchmark2/assets/sprites/caveman_spear.png');
        this.load.image('sky', 'benchmark2/assets/sprites/sky_background.png');
        this.load.spritesheet('gareth', 'benchmark2/assets/sprites/caveman_spritesheet_40x35.png', 35, 40);
        this.load.spritesheet('pterodactyl', 'benchmark2/assets/sprites/pterodactyl_spritesheet.png', 40, 40);
        this.load.spritesheet('fire','benchmark2/assets/sprites/fire_spritesheet.png', 40, 40);
        this.load.spritesheet('radio','benchmark2/assets/sprites/radio.png', 40, 40)
        this.load.spritesheet('MainButton', 'MainMenuButton.png', 339, 102);
        this.load.spritesheet('LevelButton', 'LevelSelectButton.png', 594, 101);
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.state.start('MainMenu');
        }
    }
};