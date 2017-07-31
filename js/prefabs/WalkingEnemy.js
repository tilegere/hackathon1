var Hackathon1 = Hackathon1 || {};

Hackathon1.WalkingEnemy = function(game, x, y, tilemap){
    Phaser.Sprite.call(this, game, x, y, 'walkingEnemy2');
    
    this.game = game;
    this.tilemap = tilemap;
    this.anchor.setTo(0.5);
    
    this.game.physics.arcade.enableBody(this);
    
    this.body.velocity.x = 70;
    
    var walking = this.game.time.events.loop(150, function(){
        if(this.key == 'walkingEnemy2'){
            this.loadTexture('walkingEnemy1');
        }
        else{
            this.loadTexture('walkingEnemy2');
        }
    }, this);

}

Hackathon1.WalkingEnemy.prototype = Object.create(Phaser.Sprite.prototype);
Hackathon1.WalkingEnemy.prototype.constructor = Hackathon1.WalkingEnemy;

Hackathon1.WalkingEnemy.prototype.update = function(){
    var direction;
    if(this.body.velocity.x > 0){
        this.scale.setTo(1, 1);
        direction = 1;
    }
    else{
        this.scale.setTo(-1, 1);
        direction = -1;
    }
    
    var nextX = this.x + direction * (Math.abs(this.width)/2 + 1);
    var nextY = this.bottom + 1;
    
    var nextTile = this.tilemap.getTileWorldXY(nextX, nextY, this.tilemap.tileWidth, this.tilemap.tileHeight, 'collisionLayer');
    
    if(!nextTile && this.body.blocked.down){
        this.body.velocity.x *= -1;
    }
}