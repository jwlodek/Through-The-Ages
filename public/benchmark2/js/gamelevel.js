class GameLevel {
    // constructor(name, items, player){
    //     this.name = name;
    //     this.enemyKillCounter = 0;
    //     this.items = items;
    //     this.player = player;
    // }

    constructor(levelName, player, collectableItem, level) {
        // Level
        this.levelName = levelName;
        
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
        this.level.load.tilemap('level1', 'benchmark2/assets/tilesets/ThroughTheAges_Level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.level.load.image('tiles', 'benchmark2/assets/tilesets/basictileset_level1.png');
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
            this.collectableGroup.create(x, y, 'collect');
        });
        console.log(itemPositions); 
    }

    levelUpdate(){
        
    }
}