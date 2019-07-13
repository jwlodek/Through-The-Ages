/**
 * Prototype function definition of game 'Load' State.
 * Responsible for loading in all game content before menu displays
 */

var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Load = function() {};

/**
 * Load prototype function
 */
ThroughTheAges.Load.prototype = {
    preload: function(){
        // create a simple splash screen at the start of the game
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash');
        this.splash.anchor.setTo(0.5);

        //Menu and game images
        this.load.image('MainMenu',     'Main Menu.png');
        this.load.image('Help',         'Help Text.png');
        this.load.image('Logo',         'Logo_Small.png');
        this.load.image('spear',        'gameSrc/assets/sprites/caveman_spear.png');
        this.load.image('sky',          'gameSrc/assets/sprites/sky_background.png');

        // Animated spritesheets
        this.load.spritesheet('gareth',             'gameSrc/assets/sprites/caveman_spritesheet_40x35.png', 35, 40);
        this.load.spritesheet('pterodactyl',        'gameSrc/assets/sprites/pterodactyl_spritesheet.png', 40, 40);
        this.load.spritesheet('robot_pterodactyl',  'gameSrc/assets/sprites/robot_pterodactyl_spritesheet.png', 40, 40);
        this.load.spritesheet('pigeon',             'gameSrc/assets/sprites/pigeon_spritesheet.png', 40, 40);
        this.load.spritesheet('fire',               'gameSrc/assets/sprites/fire_spritesheet.png', 40, 40);
        // Community reference anyone?
        this.load.spritesheet('energon_pod',        'gameSrc/assets/sprites/energon_pod.png', 40, 40);
        this.load.spritesheet('radio',              'gameSrc/assets/sprites/radio.png', 40, 40)
        this.load.spritesheet('MainButton',         'MainMenuButton.png', 339, 102);
        this.load.spritesheet('LevelButton',        'LevelSelectButton.png', 594, 101);

        // HUD images and animated sprites
        this.load.image('Backpack_HUD',             'gameSrc/assets/sprites/backpack_hud.png');
        this.load.image('Topbar_Health_HUD',        'gameSrc/assets/sprites/top_bar_health_hud.png');
        this.load.spritesheet('HealthBar_HUD',      'gameSrc/assets/sprites/health_heart_hud.png', 130, 30);
        this.load.image('Topbar_Lives_HUD',         'gameSrc/assets/sprites/top_bar_lives_hud.png');
        this.load.spritesheet('LivesRemain_HUD',    'gameSrc/assets/sprites/lives_remaining_hud.png', 105, 40);
        this.load.image('Topbar_Enemies_HUD',       'gameSrc/assets/sprites/top_bar_enemies_hud.png');
        this.load.image('Topbar_Items_HUD',         'gameSrc/assets/sprites/top_bar_items_hud.png');
    },
    // start the main menu state once the images are loaded and the user pressed the mouse on the splash screen
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.state.start('MainMenu');
        }
    }
};