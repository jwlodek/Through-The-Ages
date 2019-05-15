/** Actions performable by an enemy */
EnemyActions = {
    Patrol: "Patrol",
    Guard: "Guard",
    Attack: "Attack"
};

/**
 * Enemy Class
 * Contains enemy information and some basic AI
 */
class Enemy{
    constructor(enemyName, enemySprite, enemyAction){
        this.enemyName = enemyName;
        this.enemySprite = enemySprite;
        this.enemyAction = enemyAction;
        this.attackCooldown = Math.floor(Math.random() * 2000);
        this.guardPosStart = 0;
        this.guardPosEnd = 0;
        this.targetPosX = 0;
        this.targetPosY = 0;
    }


    updateAction(action, object){
        if(action === EnemyActions.Patrol || action === EnemyActions.Guard || action === EnemyActions.Attack){
            this.enemyAction = action;
            this.processAction(object);
        }
    }


    processAction(object){
        if(this.enemyAction === EnemyActions.Guard){
            this.guardPosEnd = object.position.x - 100;
            this.guardPosStart = object.position.x + 100;
        }
        else if(this.enemyAction === EnemyActions.Attack){
            this.targetPosX = object.body.position.x;
            this.targetPosY = object.body.position.y;
            this.enemySprite.body.velocity.x = (object.body.position.x - this.enemySprite.body.position.x) / 3;
            this.enemySprite.body.velocity.y = (object.body.position.y - this.enemySprite.body.position.y) / 3;
        }
    }

    attack(){
        if(Math.abs(this.enemySprite.body.position.x - this.targetPosX) < 10 && Math.abs(this.enemySprite.body.position.y - this.targetPosY))
            this.updateAction(EnemyActions.Patrol, null);
    }

    guard(){
        if(this.enemySprite.body.position.x > guardPosStart || this.enemySprite.body.position.x < guardPosEnd)
            this.enemySprite.body.velocity.x = -1 * this.enemySprite.body.velocity.x;
    }
}