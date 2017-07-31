var Hackathon1 = Hackathon1 || {};

Hackathon1.PreloadState = {
  preload: function() {
      
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);
      
    this.load.image('bubble', 'assets/images/bubble.png');

    this.load.image('dirtLeft', 'assets/images/grassHalf_left.png');
    this.load.image('dirtMid', 'assets/images/grassHalf_mid.png');
    this.load.image('dirtRight', 'assets/images/grassHalf_right.png');
      
    this.load.image('flagBlue1', 'assets/images/flagBlue1.png');
      
    this.load.image('springEnemy', 'assets/images/springMan.png');
    this.load.image('walkingEnemy1', 'assets/images/spikeMan_walk1.png');
    this.load.image('walkingEnemy2', 'assets/images/spikeMan_walk2.png');
    
    this.load.image('playerMaleStand', 'assets/images/bunny1_walk2.png');
    this.load.image('playerMaleJump', 'assets/images/bunny1_walk1.png');
    this.load.image('playerFemaleStand', 'assets/images/bunny2_walk2.png');
    this.load.image('playerFemaleJump', 'assets/images/bunny2_walk1.png');
    this.load.image('playerFemaleHurt', 'assets/images/bunny2_hurt.png');
    this.load.image('playerMaleHurt', 'assets/images/bunny1_hurt.png');
      
    this.load.image('background', 'assets/images/blue_desert.png');
      
    this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level3', 'assets/levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level4', 'assets/levels/level4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level5', 'assets/levels/level5.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level6', 'assets/levels/level6.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level7', 'assets/levels/level7.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level8', 'assets/levels/level8.json', null, Phaser.Tilemap.TILED_JSON);
      
  },
    
  create: function() {
      Hackathon1.game.state.start('HomeState'); 
  }
};