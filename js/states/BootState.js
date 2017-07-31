var Hackathon1 = Hackathon1 || {};

Hackathon1.BootState = {
    preload: function(){
        this.load.image('preloadBar', 'assets/images/bar.png');
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.stage.backgroundColor = '#000';
  },
    
  create: function() {
      Hackathon1.game.state.start('PreloadState');
  }
};