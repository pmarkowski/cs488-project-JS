var Game = function(viewer, inputHandler) {
	this.viewer = viewer;
	this.inputHandler = inputHandler;
	inputHandler.setGame(this);
}

Game.prototype.loadLevel = function(levelFile) {
	console.log("Loading level: " + levelFile);

	this.levelFilename = levelFile;
	//this.level = runJS(levelFile);
}

Game.prototype.reloadLevel = function() {
	this.loadLevel(this.levelFilename);
}

Game.prototype.nextLevel = function() {
	this.loadLevel(this.level.getNextLevel());
}

Game.prototype.update = function() {
	this.inputHandler.update();
}

Game.prototype.render = function() {
	this.viewer.update();
}

Game.prototype.rotateCamera = function(x, y) {
	// this.camera.rotateAroundFocus(x, y);
}

Game.prototype.updatePlayerMovement = function(playerMovement) {
	console.log(playerMovement);
}
