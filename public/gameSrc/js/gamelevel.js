/**
 * Main Class containing information for each level in the game. Contains functions for processing AI, the main game loop,
 * collision detection, game state, and all remaining level specific components.
 * 
 * 
 * @author: Jakub Wlodek, Vincent Paladino, Nick Pirrelo
 * @version: 1.0
 * @class GameLevel
 * 
 */
class GameLevel {

    /**
     * 
     * @param {string} levelName - level name
     * @param {string} tileMapImage - level tilemap name
     * @param {string} tileMapImagePath - Level tileset path
     * @param {string} levelPath - Path to level data file
     * @param {string} levelMusic - Path to level music
     * @param {GameState} level - Container object for the level
     * @param {float} spawnDelay - sets the delay between enemy spawns
     */
    constructor(levelName, tileMapImage, tileMapImagePath, levelPath, levelMusic, level, spawnDelay) {
        // set level information
        this.levelName = levelName;
        this.tileMapImage = tileMapImage;
        this.tileMapImagePath = tileMapImagePath;
        this.levelPath = levelPath
        this.levelMusic = levelMusic;
        this.levelPaused = false;
        
        // counter for items collected and current item
        this.itemCounter = 0;
        this.currentItem = null;

        // set level instance
        this.level = level;

        // item group
        this.collectableGroup = this.level.game.add.group();
        this.collectableGroup.enableBody = true;

        // drop off location
        this.dropOff = this.level.game.add.group();
        this.dropOff.enableBody = true;

        // enemies group
        this.enemies = this.level.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyHealth = 1;
        this.maxNumberOfEnemies = 0;

        // projectiles
        this.projectiles = this.level.game.add.group();
        this.projectiles.enableBody = true;
        this.projectiles.physicsBodyType = Phaser.Physics.ARCADE;
        this.projectiles.createMultiple(150, 'spear');
        this.projectiles.setAll('checkWorldBounds', true);
        this.projectiles.setAll('outOfBoundsKill', true);

        // enemy kill count
        this.enemyKillCount = 0;

        // attack delay and damageDelay. Used to tweak difficulty
        this.attackDelay = 0;
        this.playerDamageDelay = 0;

        // player spawn location. Overriden by level data
        this.playerSpawnLocation = { x: 0, y: 0 };
        this.playerDeathCount = 0;
        this.playerHealth = 5;

        // Information for level, items, and enemies
        this.levelInfo = this.levelName;
        this.itemsInfo = `X ${this.collectableGroup.children.length}`;
        this.enemyInfo = `X ${this.enemies.countLiving()}`;

        // enemy spawning + array storing living enemies.
        this.spawnDelay = spawnDelay;
        this.spawnDelayTimer = this.spawnDelay;
        this.liveEnemies = new Array();

        // add pause/unpause function to level
        this.level.game.input.onDown.add(this.unpause, this);
    }

    /**
     * Function for initializing the HUD (Heads up Display) for the player
     * @param {item object} item 
     * @param {Enemy object} enemy 
     */
    initHUD(item, enemy) {
        // Backpack - displays currently carried item 
        this.backpack_hud = this.level.game.add.sprite(100, 800, 'Backpack_HUD');
        this.backpack_hud.fixedToCamera = true;
        this.backpack_hud.anchor.setTo(.5,.5);

        // Healthbar - shows number of hits the player can still withstand 
        this.topbar_health_hud = this.level.game.add.sprite(25,0, 'Topbar_Health_HUD');
        this.topbar_health_hud.fixedToCamera = true;

        // Add the heart icons to the healthbar. This is done using a phaser animation
        this.healthBar_hud = this.level.game.add.sprite(125, 45, 'HealthBar_HUD');
        this.healthBar_hud.fixedToCamera = true;
        this.healthBar_hud.anchor.setTo(.5,.5);
        this.healthBar_hud.animations.add('5', [0], 1);
        this.healthBar_hud.animations.add('4', [1], 1);
        this.healthBar_hud.animations.add('3', [2], 1);
        this.healthBar_hud.animations.add('2', [3], 1);
        this.healthBar_hud.animations.add('1', [4], 1);
        this.healthBar_hud.animations.play('5', 1, false);

        // Lives (Continues) remaining - similar to healthbar just uses gareth sprite
        this.topbar_lives_hud = this.level.game.add.sprite(325,0, 'Topbar_Lives_HUD');
        this.topbar_lives_hud.fixedToCamera = true;

        this.livesRemain_hud = this.level.game.add.sprite(427,40, 'LivesRemain_HUD');
        this.livesRemain_hud.fixedToCamera = true;
        this.livesRemain_hud.anchor.setTo(.5,.5);
        this.livesRemain_hud.animations.add('3', [0], 1);
        this.livesRemain_hud.animations.add('2', [1], 1);
        this.livesRemain_hud.animations.add('1', [2], 1);
        this.livesRemain_hud.animations.play('3', 1, false);

        // Items remaining. Shows item for the given level and a count of how many there are remaining
        this.topbar_items_hud = this.level.game.add.sprite(625,0,'Topbar_Items_HUD');
        this.topbar_items_hud.fixedToCamera = true;
        this.item_hud = this.level.game.add.sprite(695,35,item);
        this.item_hud.fixedToCamera = true;
        this.item_hud.anchor.setTo(.5,.5);

        // Enemy counter hud. shows enemy sprite plus counter for live enemies
        this.topbar_enemies_hud = this.level.game.add.sprite(925,0,'Topbar_Enemies_HUD');
        this.topbar_enemies_hud.fixedToCamera = true;
        this.enemy_hud = this.level.game.add.sprite(990, 40, enemy);
        this.enemy_hud.fixedToCamera = true;
        this.enemy_hud.anchor.setTo(.5,.5);

        // Some more item and text information
        this.itemsText = this.level.game.add.text(740, 43, this.itemsInfo, { font: "22px Arial" });
        this.itemsText.fixedToCamera = true;
        this.itemsText.anchor.setTo(.5,.5);
        this.level.game.world.bringToTop(this.itemsText);

        this.enemyText = this.level.game.add.text(1040, 43, this.enemyInfo, { font: "22px Arial" });
        this.enemyText.fixedToCamera = true;
        this.enemyText.anchor.setTo(.5,.5);
        this.level.game.world.bringToTop(this.enemyText);
    }


    /**
     * Helper function that increments item counting
     */
    advanceCurrentItem() {
        this.itemCounter++;
    }


    /**
     * Helper function that plays the next level sound at the conclusion of the level
     */
    advanceLevel() {
        this.advanceLevelSound.play();
    }


    /**
     * Helper function that stops music playback
     */
    stopMusic() {
        this.music.stop();
    }


    /**
     * Function called on level load. Loads the tilemap from the tileset and initializes audio
     */
    loadLevel() {
        this.level.load.tilemap(this.levelName, this.levelPath, null, Phaser.Tilemap.TILED_JSON);
        this.level.load.image('tiles', this.tileMapImagePath);
        this.level.game.load.audio('enemy_dying', 'gameSrc/assets/sounds/enemy_dying.ogg');
        this.level.game.load.audio('player_hit', 'gameSrc/assets/sounds/player_hit.ogg');
        this.level.game.load.audio('item_collect', 'gameSrc/assets/sounds/item_collect.ogg');
        this.level.game.load.audio('item_dropoff', 'gameSrc/assets/sounds/item_dropoff.ogg');
        this.level.game.load.audio('advance_level', 'gameSrc/assets/sounds/advance_level.ogg');
        this.level.game.load.audio('player_dying', 'gameSrc/assets/sounds/player_dying.ogg');
        this.level.game.load.audio('music', this.levelMusic);
    }


    /**
     * Function thta creates the actual game level. Generates the level from the tilemap, and creates
     * the player, enemy, item, base, and background tile layers. Also starts collision detection
     */
    initLayers() {
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


    /**
     * Spawns enemys incrementally
     * @param {int} seconds How many seconds should pass between each enemy spawn
     * @param {int} speed The closer to 0 speed is, the fast it is. If speed is negative, the sprite will originate on the right side of the screen
     * @param {string} enemySprite Name of enemy sprite from load.js
     */
    releaseEnemies(seconds, speed, sprite) {
        //TODO: Make it switch sides
        this.level.game.time.events.loop(Phaser.Timer.SECOND * seconds, function () {
            this.releaseEnemy(speed, sprite);
        }, this);
    }

    /**
     * Spawns an enemy from the side of the screen and send it across the screen
     * @param {int} speed The closer to 0 speed is, the fast it is. If speed is negative, the sprite will originate on the right side of the screen
     * @param {string} enemySprite Name of enemy sprite from load.js
     */
    releaseEnemy(speed, enemySprite) {
        if (speed == 0) {
            return;
        }
        // sets start position outside of the map. Enemies fly in from the side into the screen
        var startX = -50;
        var endX = this.level.game.width + 400;
        if (speed < 0) { //Flip start and end coords
            var temp = startX;
            startX = endX;
            endX = temp;
        }
        // create the sprite and set anchor and speed
        var enemy = this.level.game.add.sprite(startX, this.level.game.world.randomY, enemySprite);
        if (speed < 0) {
            enemy.anchor.setTo(.5, .5);
            enemy.scale.x *= -1;
        }
        // animate and set health
        this.level.game.add.tween(enemy).to({
            x: endX
        }, 10000 * Math.abs(speed), Phaser.Easing.Linear.None, true).onComplete.add(this.destroySprite,this,null,enemy); //TODO: Add random angle to tween
        enemy.amountOfHealth = this.enemyHealth;
        this.enemies.add(enemy);
        enemy.animations.add('death', [4, 5, 6, 7], 20)
        enemy.animations.add('fly', [0, 1, 2, 3], 4); //TODO change this to allow for animations on other enemy sprites
        enemy.animations.play('fly', 20, true);
        this.level.game.world.bringToTop(this.enemies);

    }

    /**
     * Helper function for removing sprites once they are offscreen
     */
    destroySprite(sprite){
        sprite.destroy();
    }


    /**
     * Function that spawns AI controlled enemies that have several 'states', rather than the enemies that simply
     * go side to side like releaseEnemies()
     * @param {string} action The initial AI state of the spawned enemies
     * @param {int} maxNumber The maximum number of enemies to spawn
     * @param {string} enemyName The enemy tupe.
     */
    spawnEnemies(action, maxNumber, enemyName) {
        // set the max number of enemies for the level and the level enemy name
        this.maxNumberOfEnemies = maxNumber;
        this.enemyName = enemyName;
        // find the enemy spawn points in the level
        const enemyPositions = this.findObjectsByType('EnemySpawn', this.level.map, 'EnemyLayer');
        // spawn an enemy at each spawn point  until we reach a max number, with this.spawnDelay seconds between spawns
        enemyPositions.forEach(({ x, y }) => {
            if (this.enemies.countLiving() < maxNumber) {
                var enemy = this.level.game.add.sprite(x, y, enemyName);
                var e = new Enemy(enemyName, enemy, action);
                // create new enemy object and add it to the list, set to random velocity.
                this.liveEnemies.push(e);
                this.level.game.physics.arcade.enable(enemy);
                //console.log(enemy);
                enemy.body.velocity.x = Math.floor(Math.random() * 400) - 300;
                enemy.body.velocity.y = Math.floor(Math.random() * 400) - 300;
                enemy.anchor.setTo(.5, .5);
                if (enemy.body.velocity.x < 0) {
                    enemy.scale.x *= -1;
                }
                enemy.amountOfHealth = this.enemyHealth;
                enemy.animations.add('death', [4, 5, 6, 7], 20)
                enemy.animations.add('fly', [0, 1, 2, 3], 4); //TODO change this to allow for animations on other enemy sprites
                enemy.animations.play('fly', 20, true);

                this.enemies.add(enemy);
            }
        });
        this.level.game.world.bringToTop(this.enemies);
    }


    /**
     * Function that initializes the player in the current level. Sets initial position, 
     * enables physics and camera movement, and collision detection
     * @param {string} playerSprite Spritesheet name from load.js to be used for player
     */
    initPlayer(playerSprite) {
        // find player spawn and generate sprite
        var playerPos = this.findObjectsByType('playerStart', this.level.map, 'Player Layer');
        this.level.player = this.level.game.add.sprite(playerPos[0].x, playerPos[0].y, playerSprite);
        this.level.player.isWalking = true;
        this.level.player.lastFacing = 'Left';

        // set the initial position
        this.playerSpawnLocation = { x: playerPos[0].x, y: playerPos[0].y };

        // physics, camera, collision detection
        this.level.game.physics.arcade.enable(this.level.player);
        this.level.player.body.collideWorldBounds = true;
        this.level.game.camera.follow(this.level.player);
        this.level.player.body.acceleration.y = 500;
        this.level.player.body.acceleration.y = 600;
        this.level.game.world.bringToTop(this.level.player);
        this.music.loopFull();
    }


    /**
     * Function that initializes sound effects and music for the level
     */
    initSound() {
        this.enemyDyingSound = this.level.game.add.audio('enemy_dying');
        this.playerHitSound = this.level.game.add.audio('player_hit');
        this.itemCollectSound = this.level.game.add.audio('item_collect');
        this.itemDropoffSound = this.level.game.add.audio('item_dropoff');
        this.advanceLevelSound = this.level.game.add.audio('advance_level');
        this.playerDyingSound = this.level.game.add.audio('player_dying');
        this.music = this.level.game.add.audio('music');
        this.music.volume = .4;
    }


    /**
     * A general utility function for finding objects in level map data
     * @param {string} type The type of object to find in the level
     * @param {TiledMap} map The Map data loaded from Json level file
     * @param {string} layer The name of the target layer. ex: player, enemy, item etc.
     * @returns An array containing all tiles that fall within the given layer
     */
    findObjectsByType(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }


    /**
     * Function that uses findObjectsByType to find all locations with items and create sprites for them
     * Also adds them to helper data structures to keep track of collection
     * @param {string} item The item type to create
     */
    createItems(item) {
        this.createdItem = item;
        const itemPositions = this.findObjectsByType('CollectableItem', this.level.map, 'ItemLayer');
        this.itemsToCollect = itemPositions.length;
        itemPositions.forEach(({ x, y }) => {
            var item = this.level.game.add.sprite(x, y, this.createdItem);
            this.collectableGroup.add(item);
        });
        this.level.game.world.bringToTop(this.collectableGroup);
    }


    /**
     * Function that initializes the player home base "sprite" It is only stored virtually,
     * and is used to check the position the player needs to be in to return items
     */
    initHome() {
        const homePosition = this.findObjectsByType('Dropoff', this.level.map, 'DropoffLayer');
        homePosition.forEach(({ x, y }) => {
            var item = this.level.game.add.sprite(x, y);
            this.dropOff.add(item);
        });
        this.level.game.world.bringToTop(this.dropOff);
    }


    /**
     * An event function that is triggered when the player collides with an item while
     * he/she has an empty backpack
     * @param {Sprite} player The player sprite
     * @param {Sprite} item The item sprite that the player collided witg
     */
    collectItem(player, item) {
        if (!this.currentItem) {
            console.log('collect', item);
            this.currentItem = item;
            this.itemCollectSound.play();
            this.currentItem.kill();
            // Add image to backpack_hud
            this.backpack_hud_item = this.level.game.add.sprite(100 ,800, this.createdItem);
            this.backpack_hud_item.fixedToCamera = true;
            this.backpack_hud_item.anchor.setTo(.5,.5);
        } else {
            console.log('item in inventory');
        }

    }


    /**
     * An event function triggered when the player collides with the home base sprite while having
     * an item in his/her backpack
     * @param {Sprite} player the player sprite
     * @param {Sprite} item The item sprite for the item that the player has in his backpack
     */
    dropOffItem(player, item) {
        console.log('drop');
        if (this.currentItem) {
            console.log('drop', this.currentItem);
            this.itemDropoffSound.play();
            this.currentItem = null;
            this.itemCounter++;
            // Remove image from backpack_hud
            this.backpack_hud_item.destroy();
        }
    }


    /**
     * Function that initilaizes the player's animations for idle, walking left and right, jumping, and
     * attacking left and right. All animations are stored on the main player spritesheet
     */
    initAnimations() {
        var idle = this.level.player.animations.add('idle', [0, 1, 2, 3], 5);
        var walk_left = this.level.player.animations.add('walk_left', [5, 6, 7, 8]);
        var walk_right = this.level.player.animations.add('walk_right', [10, 11, 12, 13]);
        var jump = this.level.player.animations.add('jump', [15, 16, 17, 18]);
        var attack_left = this.level.player.animations.add('attack_left', [20, 21, 22, 23, 24]);
        var attack_right = this.level.player.animations.add('attack_right', [25, 26, 27, 28, 29]);
    }


    /**
     * Helper function called within the main level update for updating the HUD (Heads up Display)
     */
    drawHUD() {
        this.itemsInfo = `X ${this.collectableGroup.countLiving()}`;
        this.enemyInfo = `X ${this.enemies.total}`;

        this.itemsText.setText(this.itemsInfo);
        this.enemyText.setText(this.enemyInfo);
    }


    levelUpdate() {

        // spawns more enemies. Needs more work.
        //console.log(this.maxNumberOfEnemies);
        if (this.liveEnemies.length < this.maxNumberOfEnemies && this.liveEnemies.length >= 0 && this.spawnDelayTimer === 0) {
            this.spawnEnemies('Patrol', this.maxNumberOfEnemies, this.liveEnemies[0].enemySprite.key);
            this.spawnDelayTimer = this.spawnDelay;
        }

        this.spawnDelayTimer = this.spawnDelayTimer - 1;

        // updates enemies
        if (this.liveEnemies.length > 0)
            this.updateEnemies();

        this.drawHUD();
        this.level.game.physics.arcade.collide(this.level.player, this.level.platformLayer, this.handleCollision, null, this);
        this.level.game.physics.arcade.overlap(this.level.player, this.collectableGroup, this.collectItem, null, this);
        this.level.game.physics.arcade.overlap(this.level.player, this.dropOff, this.dropOffItem, null, this);
        this.level.game.physics.arcade.overlap(this.level.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
        this.level.game.physics.arcade.overlap(this.projectiles, this.enemies, this.handleAttackEnemyCollision, null, this);

        var anim_played = false;
        if (this.attackDelay > 0)
            this.attackDelay = this.attackDelay - 1;

        if (this.playerDamageDelay > 0) {
            this.playerDamageDelay = this.playerDamageDelay - 1;
        }

        if (this.level.input.keyboard.isDown(Phaser.Keyboard.M)) {
            this.level.state.start("MainMenu");
            this.stopMusic();
        }

        if (this.level.input.keyboard.isDown(Phaser.Keyboard.I)) {
            console.log("Activating Invincibility Cheat!");
            this.playerHealth = 9999;
        }

        //ATTACK INPUT
        if (this.level.input.keyboard.isDown(Phaser.Keyboard.K) && this.attackDelay == 0) {
            if (this.level.player.lastFacing == 'Left') {
                this.level.player.animations.play('attack_left');
                this.fireProjectile(0, -500);
            }
            else if (this.level.player.lastFacing == 'Right') {
                this.level.player.animations.play('attack_right');
                this.fireProjectile(180, 500);
            }
            anim_played = true;
            this.attackDelay = 30;
        }

        //WALKING INPUT
        if (this.level.input.keyboard.isDown(Phaser.Keyboard.W) && this.level.player.isWalking) {
            this.level.player.body.velocity.y = -400;
            this.level.player.isWalking = false;
            if (!anim_played)
                this.level.player.animations.play('jump');
            anim_played = true;
        }
        if (this.level.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.level.player.body.velocity.x = -300;
            this.level.player.lastFacing = 'Left';
            if (!anim_played)
                this.level.player.animations.play('walk_left');
            anim_played = true;
        }
        else if (this.level.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.level.player.body.velocity.x = 300;
            this.level.player.lastFacing = 'Right';
            if (!anim_played)
                this.level.player.animations.play('walk_right');
            anim_played = true;
        }
        else {
            this.level.player.body.velocity.x = 0;
            if (!anim_played)
                this.level.player.animations.play('idle');
        }
        if(this.level.input.keyboard.isDown(Phaser.Keyboard.P)){
            console.log("Pausing");
            //console.log(this.level.game);
            this.level.game.paused = true;
            this.pauseText = this.level.game.add.text(this.level.game.width/2, this.level.game.height/2, 'Paused - Click to Continue', { font: '48px Arial', fill: '#fff' });
            this.pauseText.anchor.setTo(0.5, 0.5);
            this.level.game.world.bringToTop(this.pauseText);
        }

    }


    /**
     * Simple event function that unpauses the game when an unpause event is triggered.
     */
    unpause(event) {
        if(this.level.game.paused){
            this.pauseText.destroy();
            this.level.game.paused = false;
        }
    }


    /**
     * Function that spawns sprite for spear/projectile with a given initial angle and velocity
     * @param {int} angle 
     * @param {int} velocity 
     */
    fireProjectile(angle, velocity) {
        //console.log('fire');
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
    handleCollision() {
        this.level.player.isWalking = true;
    }


    /**
     * Function that handles player colliding with enemy
     */
    handlePlayerEnemyCollision() {
        // Take damage if outside the post-hit invincibility stage
        if (this.playerDamageDelay === 0 && this.playerHealth > 0) {
            //console.log('Damage taken')
            this.playerHitSound.play();
            this.playerHealth = this.playerHealth - 1;
            this.playerDamageDelay = 30;
        }
        // check if the player is dead
        if (this.playerHealth === 0) {
            console.log('Player DIED')
            this.playerDyingSound.play();
            // Spawn at location
            this.level.player.x = this.playerSpawnLocation.x;
            this.level.player.y = this.playerSpawnLocation.y;
            // Add to death counter
            this.playerHealth = 5;
            this.playerDeathCount = this.playerDeathCount + 1;
            console.log('Death Count', this.playerDeathCount);
            // if player dies 3 times, reset level
            if(this.playerDeathCount === 3){
                this.stopMusic();
                this.level.state.start('Level1');
            }
        }
        this.healthBar_hud.play(this.playerHealth + '', 1, false);
        this.livesRemain_hud.play(3 - this.playerDeathCount + '');
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
            this.enemyDyingSound.play();
            enemy.body.velocity.x= 0;
            enemy.body.velocity.y = 0;
            enemy.animations.play('death',25,false,true); //Play death animation then destroy 
            this.enemyKillCount = this.enemyKillCount + 1;
            console.log('Kill count', this.enemyKillCount);
        }
    }

    /**
     * Sets the background image for the level
     * @param {string} imageName Image name in load.js
     */
    setBackgroundImage(imageName) {
        this.backgroundImage = this.level.game.add.tileSprite(0,
            this.level.height - this.level.game.cache.getImage(imageName).height,
            this.level.game.width,
            this.level.game.cache.getImage(imageName).height,
            imageName
        );
        this.backgroundImage.scale.setTo(1.5, 1.5);
    }


    /**
     * Function that checks if enemy is close to an object to guard it
     * Used to set the AI state
     * @param {sprite} enemySprite 
     */
    isNearObject(enemySprite) {
        var retItem = null;
        this.collectableGroup.hash.forEach(item => {
            if (Math.abs(enemySprite.body.position.x - item.position.x) < 100 && Math.abs(enemySprite.body.position.y - item.position.y) < 100) {
                //console.log(item);
                //console.log("Found near Item");
                retItem = item;
            }
        });
        return retItem;
    }


    /**
     * Sets the spawn delay for enemy sprites
     * @param {int} delay 
     */
    setSpawnDelay(delay){
        this.spawnDelay = delay;
    }


    /**
     * Main function for updating enemy positions + velocities. These depend on the current
     * AI state called at each cycle of levelUpdate()
     */
    updateEnemies() {
        this.liveEnemies.forEach(enemy => {
            // If patrolling, just continue to edge of screen before turning around
            if (enemy.enemyAction === EnemyActions.Patrol) {
                //console.log(enemy);
                // These should be changed to not be hard coded eventually
                if (enemy.enemySprite.body.position.x < 50) {
                    enemy.enemySprite.body.velocity.x = -1 * enemy.enemySprite.body.velocity.x;
                }
                if (enemy.enemySprite.body.position.x > 1850) {
                    enemy.enemySprite.body.velocity.x = -1 * enemy.enemySprite.body.velocity.x;
                }
                if (enemy.enemySprite.body.position.y < 50) {
                    enemy.enemySprite.body.velocity.y = -1 * enemy.enemySprite.body.velocity.y;
                }
                if (enemy.enemySprite.body.position.y > 1000) {
                    enemy.enemySprite.body.velocity.y = -1 * enemy.enemySprite.body.velocity.y;
                }
                // check if we are near an object, if yes, try and guard it. Not sure if this is working - Disabling for now
                //console.log(this.isNearObject(enemy.enemySprite));
                if (null != null) {
                    console.log("Is near an object");
                    enemy.enemySprite.body.velocity.y = 0;
                    enemy.updateAction(EnemyActions.Guard, null);
                }
                // Otherwise, wait for attack cooldown before attacking the player
                else {
                    if (enemy.attackCooldown === 0) {
                        enemy.attackCooldown = Math.floor(Math.random() * 2000);
                        enemy.updateAction(EnemyActions.Attack, this.level.player);
                    }
                    else {
                        enemy.attackCooldown = enemy.attackCooldown - 1;
                    }
                }
            }

            // Guard the item
            if (enemy.enemyAction === EnemyActions.Guard) {
                enemy.guard();
            }

            // Attack the player
            if (enemy.enemyAction === EnemyActions.Attack) {
                enemy.attack();
            }

            // check if animation needs to be flipped
            if (enemy.enemySprite.body.velocity.x < 0) {
                enemy.enemySprite.scale.x = -1;
            }
            else if (enemy.enemySprite.body.velocity.x > 0) enemy.enemySprite.scale.x = 1;
        });
    }


    /**
     * TODO - THis fixes issue where player falls through map on level 3.
     * This is bad
     * This should be fixed in a better way
     */
    fixLevel3PhysicsIssue() {
        if (this.level.player.y >= 1040) {
            this.level.player.y = 1000;
        }
    }
}