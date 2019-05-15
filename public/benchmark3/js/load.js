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
        this.load.image('spear', 'benchmark3/assets/sprites/caveman_spear.png');
        this.load.image('sky', 'benchmark3/assets/sprites/sky_background.png');
        this.load.spritesheet('gareth', 'benchmark3/assets/sprites/caveman_spritesheet_40x35.png', 35, 40);
        this.load.spritesheet('pterodactyl', 'benchmark3/assets/sprites/pterodactyl_spritesheet.png', 40, 40);
        this.load.spritesheet('robot_pterodactyl', 'benchmark3/assets/sprites/robot_pterodactyl_spritesheet.png', 40, 40);
        this.load.spritesheet('pigeon', 'benchmark3/assets/sprites/pigeon_spritesheet.png', 40, 40);
        this.load.spritesheet('fire','benchmark3/assets/sprites/fire_spritesheet.png', 40, 40);
        this.load.spritesheet('energon_pod','benchmark3/assets/sprites/energon_pod.png', 40, 40);
        this.load.spritesheet('radio','benchmark3/assets/sprites/radio.png', 40, 40)
        this.load.spritesheet('MainButton', 'MainMenuButton.png', 339, 102);
        this.load.spritesheet('LevelButton', 'LevelSelectButton.png', 594, 101);

        this.load.image('Backpack_HUD', 'benchmark3/assets/sprites/backpack_hud.png');
        this.load.image('Topbar_Health_HUD', 'benchmark3/assets/sprites/top_bar_health_hud.png');
        this.load.spritesheet('HealthBar_HUD', 'benchmark3/assets/sprites/health_heart_hud.png', 130, 30);
        this.load.image('Topbar_Lives_HUD', 'benchmark3/assets/sprites/top_bar_lives_hud.png');
        this.load.spritesheet('LivesRemain_HUD', 'benchmark3/assets/sprites/lives_remaining_hud.png', 105, 40);
        this.load.image('Topbar_Enemies_HUD', 'benchmark3/assets/sprites/top_bar_enemies_hud.png');
        this.load.image('Topbar_Items_HUD', 'benchmark3/assets/sprites/top_bar_items_hud.png');
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.state.start('MainMenu');
        }
    }
};