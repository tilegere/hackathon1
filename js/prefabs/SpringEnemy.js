var Hackathon1 = Hackathon1 || {};

Hackathon1.SpringEnemy = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'springEnemy');
    
    this.game = game;
    this.anchor.setTo(0.5);
    this.scale.setTo(1.2, 0.8);
    
    this.game.physics.arcade.enableBody(this);
    
    var enemyTween =  this.game.add.tween(this.scale);
    enemyTween.to({x: 0.8, y: 1.2}, 250, null, true, Math.ceil(Math.random * 1000), -1, true);

}

Hackathon1.SpringEnemy.prototype = Object.create(Phaser.Sprite.prototype);
Hackathon1.SpringEnemy.prototype.constructor = Hackathon1.SpringEnemy;
