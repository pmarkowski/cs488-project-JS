var InputHandler = function () {
	this.oldMouseX = Infinity;
	this.oldMouseY = Infinity;
	this.mouseSensitivity = 3;
	
	console.log(this.mouseSensitivity);
};

InputHandler.prototype.setGame = function (game) {
	this.game = game;
};

InputHandler.prototype.mouseMoveEvent = function (event) {
	if (this.oldMouseX === this.oldMouseY && this.oldMouseY === Infinity) {
		this.oldMouseX = event.screenX;
		this.oldMouseY = event.screenY;
		return;
	}
	
	var deltaX = (this.oldMouseX - event.screenX) / this.mouseSensitivity;
	var deltaY = (this.oldMouseY - event.screenY) / this.mouseSensitivity;
	
	//this.game.rotateCamera(deltaX, deltaY);
	
	this.oldMouseX = event.screenX;
	this.oldMouseY = event.screenY;
	
	console.log("moved mouse! deltaX: " + deltaX + " deltaY: " + deltaY);
};

InputHandler.prototype.keyPressEvent = function (event) {
	
};

InputHandler.prototype.keyReleaseEvent = function (event) {
	
};

InputHandler.prototype.update = function () {
	
};