/**
 * Initial game state prototype function
 */

// main game wrapper
var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Init = function(){};

/**
 * Initial state prototype implementation
 */
ThroughTheAges.Init.prototype = {
    preload: function(){
        // first load the splash screen image
        this.load.image('splash', 'Splash Screen.png');
    },
    create: function(){
        // set some inital parameters and start the load state
        this.game.stage.backgroundColor = '#000000';
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.pageAlignHorizontally = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Load');
    }
};