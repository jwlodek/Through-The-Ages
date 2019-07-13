/**
 * File that initializes the entirety of the game.
 * Creates a prototype class, adds a game to it, 
 * then initializes all game states. Finally sets the game to the initial state
 */

// This will be our entire game container
var ThroughTheAges = ThroughTheAges || {};

// create our phaser game. Resolution is set to 1920 by 1080
ThroughTheAges.game = new Phaser.Game(1920, 1080, Phaser.AUTO, '');

/**
 * ----------------------------------------------------------------+
 * Here we describe the states that our game can have. These are   |
 * expanded on further by adding to the ThroughTheAges prototype   |
 * class in the levels.js file and the menus.js file               |
 * ----------------------------------------------------------------+
 */


// Our initialization state
ThroughTheAges.game.state.add('Init', ThroughTheAges.Init);
// Our loading state. Currently just shows blank screen - should add loading animation
ThroughTheAges.game.state.add('Load', ThroughTheAges.Load);
// Main menu
ThroughTheAges.game.state.add('MainMenu', ThroughTheAges.MainMenu);
// Help menu
ThroughTheAges.game.state.add('Help', ThroughTheAges.Help);
// Level select menu
ThroughTheAges.game.state.add('LevelSelect', ThroughTheAges.LevelSelect);
// Pause state - I believe unused
ThroughTheAges.game.state.add('Pause', ThroughTheAges.Pause);

// The 4 game levels.
ThroughTheAges.game.state.add('Level1', ThroughTheAges.Level1);
ThroughTheAges.game.state.add('Level2', ThroughTheAges.Level2);
ThroughTheAges.game.state.add('Level3', ThroughTheAges.Level3);
ThroughTheAges.game.state.add('Level4', ThroughTheAges.Level4);

// start the game
ThroughTheAges.game.state.start('Init');