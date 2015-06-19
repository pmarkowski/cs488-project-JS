var Game = function(viewer, inputHandler) {
	this.viewer = viewer;
	this.inputHandler = inputHandler;
	inputHandler.setGame(this);
}

Game.prototype.loadLevel = function(levelFile) {
	console.log("Loading level: " + levelFile);

	this.levelFilename = levelFile;
	//this.level = runJS(levelFile);
	this.camera = level.camera;
	this.player = level.player;
	this.goal = level.goal;

	this.viewer.backgroundColour = level.backgroundColour;
	this.viewer.ambientLight = level.ambientLight;
	this.viewer.drawableGameObjects = level.drawableGameObjects;
	this.camera = level.camera;

	this.viewer.loadResources();
}

Game.prototype.reloadLevel = function() {
	this.loadLevel(this.levelFilename);
}

Game.prototype.nextLevel = function() {
	this.loadLevel(this.level.getNextLevel());
}

Game.prototype.update = function() {
	this.inputHandler.update();

	this.camera.velocity = player.velocity;
	for (var i = 0; i < this.level.drawableGameObjects.length; i++) {
		this.level.drawableGameObjects[i].update();
	}

	camera.update();
	camera.setFocus(player.getTranslation());

	this.render();
}

Game.prototype.render = function() {
	// Draw all the game objects
	this.viewer.update();
}

Game.prototype.rotateCamera = function(x, y) {
	this.camera.rotateAroundFocus(x, y);
}

Game.prototype.updatePlayerMovement = function(playerMovement) {
	console.log(playerMovement);
}
