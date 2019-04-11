var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

ThroughTheAges.game.state.add('Init', ThroughTheAges.Init);
ThroughTheAges.game.state.add('Load', ThroughTheAges.Load);
ThroughTheAges.game.state.add('MainMenu', ThroughTheAges.MainMenu);
ThroughTheAges.game.state.add('Help', ThroughTheAges.Help);
ThroughTheAges.game.state.add('LevelSelect', ThroughTheAges.LevelSelect);
ThroughTheAges.game.state.add('Pause', ThroughTheAges.Pause);
ThroughTheAges.game.state.add('Level1', ThroughTheAges.Level1);
ThroughTheAges.game.state.add('Level2', ThroughTheAges.Level2);
ThroughTheAges.game.state.add('Level3', ThroughTheAges.Level3);
ThroughTheAges.game.state.add('Level4', ThroughTheAges.Level4);

ThroughTheAges.game.state.start('Init');