var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.Init = function(){};

ThroughTheAges.Init.prototype = {
    preload: function(){
        this.load.image('splash', 'Splash Screen.png');
    },
    create: function(){
        this.game.stage.backgroundColor = '#000000';
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.pageAlignHorizontally = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Load');
    }
};