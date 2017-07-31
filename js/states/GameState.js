var Hackathon1 = Hackathon1 || {};

Hackathon1.GameState = {

  init: function(player, level){
      
      this.game.physics.arcade.gravity.y = 1000;
      
      this.playerChar = player || "playerFemale";
      this.level = level || 'level1';
      this.game.world.setBounds(0, 0, 2560, 352);
      this.playerAlive = true;
      
      this.playerStatus = "isJumping";
      
      this.game.input.mouse.capture = true;
      
      this.baseX = 100;
      this.baseY = -400;
      this.varX = 300;
      this.varY = -400;
  },
  
  create: function() { 
      this.loadLevel();
      
      this.overlay = this.add.bitmapData(this.game.width, this.game.height);
      this.overlay.ctx.fillStyle = '#000';
      this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);
      
      this.panel = this.add.sprite(0, 0, this.overlay);
      this.panel.fixedToCamera = true;
      var fadeIn = this.game.add.tween(this.panel);
      fadeIn.to({alpha: 0}, 500, null, true);
      
  },

  update: function(){
      if(this.playerAlive == true){
        this.game.physics.arcade.collide(this.player, this.collisionLayer, this.playerLand, null, this);
        this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
      
        if(this.playerStatus == "isLanded"){
          if(this.game.input.activePointer.isDown){
            this.playerStatus = "prepJump";
            var prepJumpBar = this.game.add.tween(this.jumpBar.scale);
            prepJumpBar.to({x: 1}, 1000, null, true, 0, -1, true);

          }
        }
        else if(this.playerStatus == "prepJump"){
          if(this.game.input.activePointer.isUp){
            this.game.tweens.removeFrom(this.jumpBar.scale);
            this.playerStatus = "isJumping";
            this.player.loadTexture(this.playerChar + "Jump");
            this.player.body.velocity.x = this.baseX + this.varX * this.jumpBar.scale.x;
            this.player.body.velocity.y = this.baseY + this.varY * this.jumpBar.scale.x;
            var resetJumpBar = this.game.add.tween(this.jumpBar.scale);
            resetJumpBar.to({x: 0}, 500, null, true);
          }
        }
      
        if(this.player.x >= this.goal.left && this.player.y <= this.goal.bottom){
          this.playerStatus = "goal";
          if(this.level!= 'level8'){
            this.levelChange(this.goal.nextLevel, this);
          }
          else{
              var style = {font: '40px Arial', fill: '#000'};
              this.congrats = this.game.add.text(2100, 200, 'Congratulations!', style);
              this.congrats.alpha = 0;
              var grats = this.game.add.tween(this.congrats);
              grats.to({alpha:1}, 2000);
              grats.onComplete.add(function(){
                  fadeOut.start();
              }, this);
              var fadeOut = this.game.add.tween(this.panel);
                fadeOut.to({alpha: 1.5}, 500);
                fadeOut.onComplete.add(function(){
                Hackathon1.game.state.start('HomeState');    
            }, this);
            grats.start();
          }
              
        }
      }
      if(this.player.y + this.player.height > this.game.height){
          if(this.platerStatus!= "goal"){ 
          this.levelChange(this.level, this);
          }
       }
      this.game.physics.arcade.collide(this.enemies, this.collisionLayer);
      
      this.background.x = this.game.camera.x * 0.4;
  },
      
    playerLand: function(){
        if(this.player.body.blocked.down){
            if(this.playerStatus != "isLanded" && this.playerStatus != "prepJump"){
                this.player.loadTexture(this.playerChar + 'Stand');
                this.playerStatus = "isLanded";
                this.player.body.velocity.x = 0;
                this.jumpBar.scale.setTo(0, 1);
            }
        }
        
    },

    
    loadLevel: function(){
        this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
        
        this.map = this.add.tilemap(this.level);
        this.map.addTilesetImage('sandHalf_left', 'dirtLeft');
        this.map.addTilesetImage('sandHalf_mid', 'dirtMid');
        this.map.addTilesetImage('sandHalf_right', 'dirtRight');
        
        this.collisionLayer = this.map.createLayer('collisionLayer');
        this.map.setCollisionBetween(1, 44, true, 'collisionLayer');
        
        
        var playerArr = this.findObjectsByType('player', this.map, 'objectLayer');
        this.player = this.game.add.sprite(playerArr[0].x, playerArr[0].y, this.playerChar + 'Jump');
        this.player.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);
        this.player.body.setSize(45, 75, 8, 26);
        
        this.jumpBack = this.game.add.sprite(20, 20, 'preloadBar');
        this.jumpBack.tint = 0x422C2F;
        this.jumpBack.fixedToCamera = true;
        this.jumpBar = this.game.add.sprite(20, 20, 'preloadBar');
        this.jumpBar.fixedToCamera = true;
        this.jumpBar.scale.setTo(0, 1);
        
        this.createEnemies();
        
        this.enemies.setAll('body.immovable', true);
        
        var goalArr = this.findObjectsByType('goal', this.map, 'objectLayer');
        this.goal = this.add.sprite(goalArr[0].x, goalArr[0].y, 'flagBlue1');
        this.goal.nextLevel = goalArr[0].properties.nextLevel;
        
    },
    
    findObjectsByType: function(targetType, tilemap, layer){
        var result = [];
        tilemap.objects[layer].forEach(function(element){
            if(element.properties.type == targetType){
                result.push(element);
            }
        }, this);
        return result;
    },
    
    createEnemies: function(){
        this.enemies = this.add.group();
        
        var springEnemyArr = this.findObjectsByType('springEnemy', this.map, 'objectLayer');
        
        var enemy;
        springEnemyArr.forEach(function(element){
            enemy = new Hackathon1.SpringEnemy(this.game, element.x, element.y);
            this.game.add.existing(enemy);
            this.enemies.add(enemy);
        }, this);
        
        var walkEnemyArr = this.findObjectsByType('walkingEnemy', this.map, 'objectLayer');
        
        walkEnemyArr.forEach(function(element){
            enemy = new Hackathon1.WalkingEnemy(this.game, element.x, element.y, this.map);
            this.game.add.existing(enemy);
            this.enemies.add(enemy);
        }, this);
    },
    
    hitEnemy: function(){
        this.playerAlive = false;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = -300;
        this.player.loadTexture(this.playerChar + 'Hurt');
    },
    
    levelChange: function(level){
        var fadeOut = this.game.add.tween(this.panel);
        fadeOut.to({alpha: 1.5}, 500, null, true);
        fadeOut.onComplete.add(function(){
            Hackathon1.game.state.start('GameState', true, false, this.playerChar, level);    
        }, this);
        
    }
};