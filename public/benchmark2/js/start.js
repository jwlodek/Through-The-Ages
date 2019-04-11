var ThroughTheAges = ThroughTheAges || {};

ThroughTheAges.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

ThroughTheAges.game.state.add('Init', ThroughTheAges.Init);
ThroughTheAges.game.state.add('Load', ThroughTheAges.Load);
ThroughTheAges.game.state.add('MainMenu', ThroughTheAges.MainMenu);
ThroughTheAges.game.state.add('HelpMenu', ThroughTheAges.Help);
ThroughTheAges.game.state.add('LevelSelectMenu', ThroughTheAges.LevelSelect);
ThroughTheAges.game.state.add('PauseMenu', ThroughTheAges.Pause);
ThroughTheAges.game.state.add('Running', ThroughTheAges.Running);

ThroughTheAges.game.state.start('Init');