var Game = function(viewer) {
	this.viewer = viewer;
};

Game.prototype.loadLevel = function (levelFile) {
	console.log("Loading level: " + levelFile);
	
	this.levelFilename = levelFile;
	//this.level = runJS(levelFile);
};

Game.prototype.reloadLevel = function () {
	this.loadLevel(this.levelFilename);
};

Game.prototype.nextLevel = function () {
	this.loadLevel(this.level.getNextLevel());
};

Game.prototype.start = function () {
	console.log("Starting the game!");
	setInterval(this.update, GAME_INTERVAL_MS);
};

Game.prototype.update = function () {
	//console.log("Updated");
};

Game.prototype.render = function () {
	this.viewer.update();
};