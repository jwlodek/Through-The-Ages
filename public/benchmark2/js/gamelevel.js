class GameLevel {
    // constructor(name, items, player){
    //     this.name = name;
    //     this.enemyKillCounter = 0;
    //     this.items = items;
    //     this.player = player;
    // }

    constructor(levelName, tileMapImage, tileMapImagePath, levelPath, levelMusic, level) {
        // Level
        this.levelName = levelName;
        this.tileMapImage = tileMapImage;
        this.tileMapImagePath = tileMapImagePath;
        this.levelPath = levelPath
        this.levelMusic = levelMusic;
        
        this.itemCounter = 0;
        this.currentItem = null;
        
        this.level = level;

        this.collectableGroup = this.level.game.add.group();
        this.collectableGroup.enableBody = true;

        this.dropOff = this.level.game.add.group();
        this.dropOff.enableBody = true;

        this.enemies = this.level.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyHealth = 1;
        this.maxNumberOfEnemies = 0;

        this.projectiles = this.level.game.add.group();
        this.projectiles.enableBody = true;
        this.projectiles.physicsBodyType = Phaser.Physics.ARCADE;
        this.projectiles.createMultiple(150, 'spear');
        this.projectiles.setAll('checkWorldBounds', true);
        this.projectiles.setAll('outOfBoundsKill', true);

        this.enemyKillCount = 0;

        this.attackDelay = 0;
        this.playerDamageDelay = 0;

        this.playerSpawnLocation = {x: 0, y: 0};
        this.playerDeathCount = 0;
        this.playerHealth = 3;

        this.levelInfo = 'Time Period: ' + this.levelName;
        const carryingInfo = this.currentItem ? 'Yes' : 'No';
        this.itemsInfo = 'Items to Collect: ' + this.collectableGroup.children.length +', Items collected: ' + this.itemCounter + ', Carrying Item: ' + carryingInfo;
        this.deathInfo = `Death Count: ${this.playerDeathCount}`;
        this.enemyInfo = `Enemies Left: ${this.enemies.countLiving()} / ${this.enemies.total}`;
        this.playerInfo = `Player Health: ${this.playerHealth} / 3`;

        this.liveEnemies = new Array();
        
    }

    initHUD() {
        this.levelText = this.level.game.add.text(10,10, this.levelInfo,{ font: "22px Arial" });
        this.levelText.fixedToCamera = true;
        this.level.game.world.bringToTop(this.levelText);
        this.playerText = this.level.game.add.text(10, 30, this.playerInfo,{ font: "22px Arial" });
        this.playerText.fixedToCamera = true;
        this.level.game.world.bringToTop(this.playerText);
        this.itemsText = this.level.game.add.text(10, 50, this.itemsInfo,{ font: "22px Arial" });
        this.itemsText.fixedToCamera = true;
        this.level.game.world.bringToTop(this.itemsText);
        this.deathText = this.level.game.add.text(10, 70, this.deathInfo,{ font: "22px Arial" });
        this.deathText.fixedToCamera = true;
        this.level.game.world.bringToTop(this.deathText);
        this.enemyText = this.level.game.add.text(10, 90, this.enemyInfo,{ font: "22px Arial" });
        this.enemyText.fixedToCamera = true;
        this.level.game.world.bringToTop(this.enemyText);
    }

    advanceCurrentItem() {
        this.itemCounter++;
    }

    stopMusic() {
        this.level.game.sound.stopAll();
    }

    loadLevel() {
        this.level.load.tilemap(this.levelName, this.levelPath, null, Phaser.Tilemap.TILED_JSON);
        this.level.load.image('tiles', this.tileMapImagePath);
        // TODO load through parameter in constructor
        this.level.game.load.audio('enemy_dying', 'benchmark2/assets/sounds/enemy_dying.ogg');
        this.level.game.add.audio('enemy_dying');
        this.level.game.load.audio('music', this.levelMusic);
        this.level.game.add.audio('music');
    }

    initLayers(){
        this.level.game.world.setBounds(0, 0, 1920, 1080);
        
        this.level.map = this.level.game.add.tilemap(this.levelName);
        this.level.map.addTilesetImage(this.tileMapImage, 'tiles');
        this.level.backgroundLayer = this.level.map.createLayer('Background Layer');
        this.level.platformLayer = this.level.map.createLayer('Platform Layer');
        this.level.itemLayer = this.level.map.createLayer('ItemLayer');
        this.level.homeBaseLayer = this.level.map.createLayer('HomeBaseLayer');
        this.level.playerLayer = this.level.map.createLayer('Player Layer');

        
        this.level.map.setCollisionBetween(1, 100000, true, 'Platform Layer');
    }

    /*spawnEnemies() {
        const enemyPositions = this.findObjectsByType('EnemySpawn', this.level.map, 'EnemyLayer');
        enemyPositions.forEach(({x,y}) => {
            const enemy = this.level.game.add.sprite(x, y, 'pterodactyl');
            enemy.amountOfHealth = this.enemyHealth;
            this.enemies.add(enemy);
        });
        this.level.game.world.bringToTop(this.enemies);
    }*/


    /**
     * Spawns enemys incrementally
     * @param {int} seconds How many seconds should pass between each enemy spawn
     * @param {int} speed The closer to 0 speed is, the fast it is. If speed is negative, the sprite will originate on the right side of the screen
     * @param {string} enemySprite Name of enemy sprite from load.js
     */
    releaseEnemies(seconds, speed, sprite){
        //TODO: Make it switch sides
        this.level.game.time.events.loop(Phaser.Timer.SECOND * seconds, function(){
            this.releaseEnemy(speed,sprite);
        }, this);
    }

    /**
     * Spawns an enemy from the side of the screen and send it across the screen
     * @param {int} speed The closer to 0 speed is, the fast it is. If speed is negative, the sprite will originate on the right side of the screen
     * @param {string} enemySprite Name of enemy sprite from load.js
     */
    releaseEnemy(speed, enemySprite){
        if(speed == 0){
            return;
        }
        var startX = -50;
        var endX = this.level.game.width + 400;
        if(speed < 0 ){ //Flip start and end coords
            var temp = startX;
            startX = endX;
            endX = temp;
        }
        var enemy = this.level.game.add.sprite(startX, this.level.game.world.randomY, enemySprite);
        if(speed < 0){
            enemy.anchor.setTo(.5,.5);
            enemy.scale.x *= -1;
        }
        this.level.game.add.tween(enemy).to({
            x: endX}, 10000 * Math.abs(speed), Phaser.Easing.Linear.None,true); //TODO: Add random angle to tween
        enemy.amountOfHealth = this.enemyHealth;
        this.enemies.add(enemy);
        enemy.animations.add('death',[4,5,6,7],20)
        enemy.animations.add('fly', [0,1,2,3], 4); //TODO change this to allow for animations on other enemy sprites
        enemy.animations.play('fly',20,true);
        this.level.game.world.bringToTop(this.enemies);

    }



    spawnEnemies(action, maxNumber, enemyName){
        this.maxNumberOfEnemies = maxNumber;
        const enemyPositions = this.findObjectsByType('EnemySpawn', this.level.map, 'EnemyLayer');
        enemyPositions.forEach(({x, y}) => {
            if(this.enemies.countLiving() < maxNumber){
                var enemy = this.level.game.add.sprite(x, y, enemyName);
                var e = new Enemy(enemyName, enemy, action);
                this.liveEnemies.push(e);
                this.level.game.physics.arcade.enable(enemy);
                //console.log(enemy);
                enemy.body.velocity.x = Math.floor(Math.random() * 400) - 300;
                enemy.body.velocity.y = Math.floor(Math.random() * 400) - 300;
                enemy.anchor.setTo(.5, .5);
                if(enemy.body.velocity.x < 0){
                    enemy.scale.x *= -1;
                }
                enemy.amountOfHealth = this.enemyHealth;
                enemy.animations.add('death',[4,5,6,7],20)
                enemy.animations.add('fly', [0,1,2,3], 4); //TODO change this to allow for animations on other enemy sprites
                enemy.animations.play('fly',20,true);
                this.enemies.add(enemy);
            }
        });
        this.level.game.world.bringToTop(this.enemies);   
    }
    

    /**
     * 
     * @param {string} playerSprite Spritesheet name from load.js to be used for player
     */
    initPlayer(playerSprite){
        var playerPos = this.findObjectsByType('playerStart', this.level.map, 'Player Layer');
        this.level.player = this.level.game.add.sprite(playerPos[0].x, playerPos[0].y, playerSprite);
        this.level.player.isWalking = true;
        this.level.player.lastFacing = 'Left';

        this.playerSpawnLocation = {x: playerPos[0].x, y: playerPos[0].y};

        this.level.game.physics.arcade.enable(this.level.player);
        this.level.player.body.collideWorldBounds = true;
        this.level.game.camera.follow(this.level.player);
        this.level.player.body.acceleration.y = 500;
        this.level.player.body.acceleration.y = 600;
        this.level.game.world.bringToTop(this.level.player);
        this.level.game.sound.play('music');
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

    createItems(item) {
        const itemPositions = this.findObjectsByType('CollectableItem', this.level.map, 'ItemLayer');
        this.itemsToCollect = itemPositions.length;
        itemPositions.forEach(({x,y}) => {
            var item = this.level.game.add.sprite(x, y, 'fire');
            this.collectableGroup.add(item);
        });
        this.level.game.world.bringToTop(this.collectableGroup);
    }

    initHome() {
        const homePosition = this.findObjectsByType('Dropoff', this.level.map, 'DropoffLayer');
        homePosition.forEach(({x,y}) => {
            var item = this.level.game.add.sprite(x, y);
            this.dropOff.add(item);
        });
        this.level.game.world.bringToTop(this.dropOff);
    }

    collectItem(player, item) {
        if (!this.currentItem) {
            console.log('collect', item);
            this.currentItem = item;
            this.currentItem.kill();
        } else {
            console.log('item in inventory');
        }
        
    }

    dropOffItem(player, item) {
        console.log('drop');
        if (this.currentItem) {
            console.log('drop', this.currentItem);
            this.currentItem = null;
            this.itemCounter++;
        }
    }

    initAnimations(){
        var idle = this.level.player.animations.add('idle', [0,1,2,3], 5);
        var walk_left = this.level.player.animations.add('walk_left', [5, 6, 7, 8]);
        var walk_right = this.level.player.animations.add('walk_right', [10, 11, 12, 13]);
        var jump = this.level.player.animations.add('jump', [15, 16, 17, 18]);
        var attack_left = this.level.player.animations.add('attack_left', [20, 21, 22, 23, 24]);
        var attack_right = this.level.player.animations.add('attack_right', [25, 26, 27, 28, 29]);
    }

    drawHUD(){
        this.levelInfo = 'Time Period: ' + this.levelName;
        const carryingInfo = this.currentItem ? 'Yes' : 'No';
        this.itemsInfo = 'Items to Collect: ' + this.collectableGroup.children.length +', Items collected: ' + this.itemCounter + ', Carrying Item: ' + carryingInfo;
        this.deathInfo = `Death Count: ${this.playerDeathCount}`;
        this.enemyInfo = `Enemies Left: ${this.enemies.total}`;
        this.playerInfo = `Player Health: ${this.playerHealth} / 3`;
        
        this.itemsText.setText(this.itemsInfo);
        this.levelText.setText(this.levelInfo);
        this.playerText.setText(this.playerInfo);
        this.deathText.setText(this.deathInfo);
        this.enemyText.setText(this.enemyInfo);
    }


    levelUpdate(){

        // spawns more enemies. Needs more work.
        //if(this.enemies.countLiving() < this.maxNumberOfEnemies && this.liveEnemies.length > 0){
        //    this.spawnEnemies(2, 'Patrol', this.maxNumberOfEnemies, this.liveEnemies[0].key);
        //}

        // updates enemies
        if(this.liveEnemies.length >0)
            this.updateEnemies();

        this.drawHUD();
        this.level.game.physics.arcade.collide(this.level.player, this.level.platformLayer, this.handleCollision, null, this);
        this.level.game.physics.arcade.overlap(this.level.player, this.collectableGroup, this.collectItem, null, this);
        this.level.game.physics.arcade.overlap(this.level.player, this.dropOff, this.dropOffItem, null, this);
        this.level.game.physics.arcade.overlap(this.level.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
        this.level.game.physics.arcade.overlap(this.projectiles, this.enemies, this.handleAttackEnemyCollision, null, this);

        var anim_played = false;
        if(this.attackDelay > 0)
            this.attackDelay = this.attackDelay - 1;

        if (this.playerDamageDelay > 0) {
            this.playerDamageDelay = this.playerDamageDelay - 1;
        }

        if (this.level.input.keyboard.isDown(Phaser.Keyboard.M)){
            this.level.state.start("MainMenu");
            stopMusic();
        }

        if (this.level.input.keyboard.isDown(Phaser.Keyboard.I)){
            console.log("Activating Invincibility Cheat!");
            this.playerHealth = 9999;
        }

        //ATTACK INPUT
        if(this.level.input.keyboard.isDown(Phaser.Keyboard.K) && this.attackDelay == 0){
            if(this.level.player.lastFacing == 'Left'){
                this.level.player.animations.play('attack_left');
                this.fireProjectile(0, -300);
            }
            else if(this.level.player.lastFacing == 'Right'){
                this.level.player.animations.play('attack_right');
                this.fireProjectile(180, 300);
            }
            anim_played = true;
            this.attackDelay = 30;
        }

        //WALKING INPUT
        if(this.level.input.keyboard.isDown(Phaser.Keyboard.W) && this.level.player.isWalking){
            this.level.player.body.velocity.y = -400;
            this.level.player.isWalking = false;
            if(!anim_played)
                this.level.player.animations.play('jump');
            anim_played = true;
        }
        if(this.level.input.keyboard.isDown(Phaser.Keyboard.A)){
            this.level.player.body.velocity.x  = -300;
            this.level.player.lastFacing = 'Left';
            if(!anim_played)
                this.level.player.animations.play('walk_left');
            anim_played = true;
        }
        else if(this.level.input.keyboard.isDown(Phaser.Keyboard.D)){
            this.level.player.body.velocity.x = 300;
            this.level.player.lastFacing = 'Right';
            if(!anim_played)
                this.level.player.animations.play('walk_right');
            anim_played = true;
        }
        else{
            this.level.player.body.velocity.x = 0;
            if(!anim_played)
                this.level.player.animations.play('idle');
        }

    }

    /**
     * Function that spawns sprite for spear/projectile
     * @param {int} angle 
     * @param {int} velocity 
     */
    fireProjectile(angle, velocity) {
        console.log('fire');
        const spear = this.projectiles.getFirstDead();;
        spear.reset(this.level.player.x, this.level.player.y + 20);
        this.level.game.world.bringToTop(spear);
        spear.anchor.setTo(0.5, 0.5);
        spear.angle = angle;
        spear.body.velocity.x = velocity;
        this.level.game.world.bringToTop(this.projectiles);
    }

    /**
     * Set player to walking if landed on platform
     */
    handleCollision(){
        this.level.player.isWalking = true;
    }


    /**
     * Function that handles player colliding with enemy
     */
    handlePlayerEnemyCollision() {
        if (this.playerDamageDelay === 0 && this.playerHealth > 0) {
            console.log('Damage taken')
            this.playerHealth = this.playerHealth - 1;
            this.playerDamageDelay = 30;
        }
        if (this.playerHealth === 0) {
            console.log('Player DIED')
            // Spawn at location
            this.level.player.x = this.playerSpawnLocation.x;
            this.level.player.y = this.playerSpawnLocation.y;
            // Add to death counter
            this.playerHealth = 3;
            this.playerDeathCount = this.playerDeathCount + 1;
            console.log('Death Count', this.playerDeathCount);
            // if player dies 3 times, reset level
            if(this.playerDeathCount === 3){
                stopMusic();
                this.level.state.start('Level1');
            }
        }
    }


    /**
     * Function called on enemy colliding with spear
     * @param {sprite} weapon 
     * @param {sprite} enemy 
     */
    handleAttackEnemyCollision(weapon, enemy) {
        console.log('Enemy Hit');
        weapon.kill();
        enemy.amountOfHealth = enemy.amountOfHealth - 1;
        if (enemy.amountOfHealth <= 0) {
            //enemy.kill();
            console.log(this.enemyDyingSound);
            this.level.game.sound.play('enemy_dying');
            enemy.animations.play('death',25,false,true); //Play death animation then destroy 
            this.enemyKillCount = this.enemyKillCount + 1;
            console.log('Kill count', this.enemyKillCount);
        }
    }

    /**
     * Sets the background image for the level
     * @param {string} imageName 
     */
    setBackgroundImage(imageName){
        this.backgroundImage = this.level.game.add.tileSprite(0, 
            this.level.height - this.level.game.cache.getImage(imageName).height, 
            this.level.game.width, 
            this.level.game.cache.getImage(imageName).height, 
            imageName
        );
        this.backgroundImage.scale.setTo(1.5,1.5);
    }


    /**
     * Function that checks if enemy is close to an object to guard it
     * @param {sprite} enemySprite 
     */
    isNearObject(enemySprite){
        this.collectableGroup.forEach(item => {
            if(Math.abs(enemySprite.body.position.x - item.position.x) < 100 && Math.abs(enemySprite.body.position.y - item.position.y) < 100){
                //console.log(item);
                return item;
            }
        });
        return null;
    }


    /**
     * Main function for updating enemy positions + velocities. These depend on the current
     * AI state
     */
    updateEnemies(){
        this.liveEnemies.forEach(enemy => {
            // If patrolling, just continue to edge of screen before turning around
            if(enemy.enemyAction === EnemyActions.Patrol){
                //console.log(enemy);
                // These should be changed to not be hard coded eventually
                if(enemy.enemySprite.body.position.x < 50){
                    enemy.enemySprite.body.velocity.x = -1 * enemy.enemySprite.body.velocity.x;
                }
                if(enemy.enemySprite.body.position.x > 1850){
                    enemy.enemySprite.body.velocity.x = -1 * enemy.enemySprite.body.velocity.x;
                }
                if(enemy.enemySprite.body.position.y < 50){
                    enemy.enemySprite.body.velocity.y = -1 * enemy.enemySprite.body.velocity.y;
                }
                if(enemy.enemySprite.body.position.y > 1000){
                    enemy.enemySprite.body.velocity.y = -1 * enemy.enemySprite.body.velocity.y;
                }
                // check if we are near an object, if yes, try and guard it. Not sure if this is working
                var nearObj = this.isNearObject(enemy.enemySprite);
                if(nearObj !== null){
                    enemy.enemySprite.body.velocity.y = 0;
                    enemy.updateAction(EnemyActions.Guard, nearObj);
                }
                // Otherwise, wait for attack cooldown before attacking the player
                else{
                    if(enemy.attackCooldown === 0){
                        enemy.attackCooldown = Math.floor(Math.random() * 2000);
                        enemy.updateAction(EnemyActions.Attack, this.level.player);
                    }
                    else{
                        enemy.attackCooldown = enemy.attackCooldown -1;
                    }
                }
            }
        
            // Guard the item
            if(enemy.enemyAction === EnemyActions.Guard){
                enemy.guard();
            }

            // Attack the player
            if(enemy.enemyAction === EnemyActions.Attack){
                enemy.attack();
            }

            // check if animation needs to be flipped
            if(enemy.enemySprite.body.velocity.x < 0){
                enemy.enemySprite.scale.x = -1;
            }
            else if(enemy.enemySprite.body.velocity.x > 0) enemy.enemySprite.scale.x = 1;
        });
    }
}