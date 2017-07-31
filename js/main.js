//initiate the Phaser framework
Hackathon1.game = new Phaser.Game(640, 360, Phaser.AUTO);

Hackathon1.game.state.add('GameState', Hackathon1.GameState);
Hackathon1.game.state.add('HomeState', Hackathon1.HomeState);
Hackathon1.game.state.add('BootState', Hackathon1.BootState);
Hackathon1.game.state.add('PreloadState', Hackathon1.PreloadState);
Hackathon1.game.state.start('BootState');

