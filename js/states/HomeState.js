var Hackathon1 = Hackathon1 || {};

Hackathon1.HomeState = {
    
    create: function() {
        
        var style = {font: '35px Arial', fill: '#fff'};
        this.game.add.text(220, 100, 'Bunny Hop!', style);
        this.game.add.text(190, this.game.world.centerY, 'Pick a character!', style);

        this.malePlayer = this.add.button(20, 200, 'playerMaleStand');
        this.malePlayer.scale.setTo(1);
        this.femalePlayer = this.add.button(590, 200, 'playerFemaleStand');
        this.femalePlayer.scale.setTo(-1, 1);
        
        this.malePlayer.events.onInputDown.add(function(){
            Hackathon1.game.state.start('GameState', true, false, 'playerMale', 'level1');
        });
        this.femalePlayer.events.onInputDown.add(function(){
            Hackathon1.game.state.start('GameState', true, false, 'playerFemale', 'level1');
        });
        
    }
};