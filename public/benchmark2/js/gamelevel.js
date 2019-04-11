class GameLevel {
    // constructor(name, items, player){
    //     this.name = name;
    //     this.enemyKillCounter = 0;
    //     this.items = items;
    //     this.player = player;
    // }

    constructor(levelName, tileMapImage, tileMapImagePath, levelPath, player, collectableItem, level) {
        // Level
        this.levelName = levelName;
        this.tileMapImage = tileMapImage;
        this.tileMapImagePath = tileMapImagePath;
        this.levelPath = levelPath
        
        // Player
        this.player = player

        this.collectableItem = collectableItem;
        this.itemCounter = 0;
        
        this.level = level;

        this.collectableGroup = this.level.game.add.group();
        this.collectableGroup.enableBody = true;
    }

    advanceCurrentItem() {
        this.itemCounter++;
    }

    loadLevel() {
        this.level.load.tilemap(this.levelName, this.levelPath, null, Phaser.Tilemap.TILED_JSON);
        this.level.load.image('tiles', this.tileMapImagePath);
    }

    initLayers(){
        this.level.game.world.setBounds(0, 0, 1920, 1080);
        
        this.level.map = this.level.game.add.tilemap(this.levelName);
        this.level.map.addTilesetImage(this.tileMapImage, 'tiles');

        this.level.backgroundLayer = this.level.map.createLayer('BackgroundLayer');
        this.level.platformLayer = this.level.map.createLayer('Platform Layer');
        this.level.itemLayer = this.level.map.createLayer('ItemLayer');
        this.level.homeBaseLayer = this.level.map.createLayer('HomeBaseLayer');
        this.level.playerLayer = this.level.map.createLayer('Player Layer');

        
        this.level.map.setCollisionBetween(1, 100000, true, 'Platform Layer');
    }

    initPlayer(){
        var playerPos = this.findObjectsByType('playerStart', this.level.map, 'Player Layer');
        this.level.player = this.level.game.add.sprite(playerPos[0].x, playerPos[0].y, 'gareth');

        this.level.game.physics.arcade.enable(this.level.player);
        this.level.player.body.collideWorldBounds = true;
        this.level.game.camera.follow(this.level.player);
        this.level.player.body.acceleration.y = 500;
    }

    findObjectsByType(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }

    createItems() {
        const itemPositions = this.findObjectsByType('CollectableItem', this.level.map, 'ItemLayer');
        itemPositions.forEach(({x,y}) => {
            console.log({x,y});
            var item = this.level.game.add.sprite(x, y, 'collect');
            this.collectableGroup.add(item);
        });
        this.level.game.world.bringToTop(this.collectableGroup);
 
    }

    initAnimations(){
        var idle = this.level.player.animations.add('idle', [0,1,2,3]);
        var walk_left = this.level.player.animations.add('walk_left', [5, 6, 7, 8]);
        var walk_right = this.level.player.animations.add('walk_right', [10, 11, 12, 13]);
        var jump = this.level.player.animations.add('jump', [15, 16, 17, 18]);
        var attack_left = this.level.player.animations.add('attack_left', [20, 21, 22, 23, 24]);
        var attack_right = this.level.player.animations.add('attack_right', [25, 26, 27, 28, 29]);
    }


    levelUpdate(){

        this.level.game.physics.arcade.collide(this.level.player, this.level.platformLayer);

        if(this.level.input.keyboard.isDown(Phaser.Keyboard.A)){
            this.level.player.body.velocity.x  = -200;
            this.level.player.animations.play('walk_left');
        }
        else if(this.level.input.keyboard.isDown(Phaser.Keyboard.D)){
            this.level.player.body.velocity.x = 200;
            this.level.player.animations.play('walk_right');
        }
        else if(this.level.input.keyboard.isDown(Phaser.Keyboard.W)){
            this.level.player.body.velocity.y = -400;
            this.level.player.animations.play('jump');
        }
        else{
            this.level.player.body.velocity.x = 0;
            this.level.player.animations.play('idle')
        }
        
    }
}