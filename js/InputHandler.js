var InputHandler = function() {
	this.oldMouseX = Infinity;
	this.oldMouseY = Infinity;
	this.mouseSensitivity = 3;

	this.keyMap = {};

	console.log(this.mouseSensitivity);

	// Private Members
	this.setKeyMapValueFromEvent = function (event, value) {
		var pressedKey = String.fromCharCode(event.which || event.keyCode);
		switch (pressedKey) {
			case "W":
			case "A":
			case "S":
			case "D":
			case " ":
				this.keyMap[pressedKey] = value;
				break;
			default:
				break;
		}
	}
}

InputHandler.KeyState = {
	PRESSED  : 1,
	RELEASED : 2
}

InputHandler.prototype.setGame = function(game) {
	this.game = game;
}

InputHandler.prototype.mouseMoveEvent = function(event) {
	if (this.oldMouseX === this.oldMouseY && this.oldMouseY === Infinity) {
		this.oldMouseX = event.screenX;
		this.oldMouseY = event.screenY;
		return;
	}

	var deltaX = (this.oldMouseX - event.screenX) / this.mouseSensitivity;
	var deltaY = (this.oldMouseY - event.screenY) / this.mouseSensitivity;

	this.game.rotateCamera(deltaX, deltaY);

	this.oldMouseX = event.screenX;
	this.oldMouseY = event.screenY;
}

InputHandler.prototype.keyPressEvent = function(event) {
	this.setKeyMapValueFromEvent(event, InputHandler.KeyState.PRESSED);
}

InputHandler.prototype.keyReleaseEvent = function(event) {
	this.setKeyMapValueFromEvent(event, InputHandler.KeyState.RELEASED);
}

InputHandler.prototype.update = function() {
	var playerMovement = new THREE.Vector3();
	playerMovement.y = -1;

	// Check state of the keys we're interested in to set movement
	if (this.keyMap["W"]) {
		if (this.keyMap["W"] === InputHandler.KeyState.PRESSED) {
			playerMovement.z = 1;
		} else {
			playerMovement.z = 0;
			delete this.keyMap["W"];
		}
	}
	if (this.keyMap["S"]) {
		if (this.keyMap["S"] === InputHandler.KeyState.PRESSED) {
			playerMovement.z = -1;
		} else {
			playerMovement.z = 0;
			delete this.keyMap["S"];
		}
	}
	if (this.keyMap["A"]) {
		if (this.keyMap["A"] === InputHandler.KeyState.PRESSED) {
			playerMovement.x = 1;
		} else {
			playerMovement.x = 0;
			delete this.keyMap["A"];
		}
	}
	if (this.keyMap["D"]) {
		if (this.keyMap["D"] === InputHandler.KeyState.PRESSED) {
			playerMovement.x = -1;
		} else {
			playerMovement.x = 0;
			delete this.keyMap["D"];
		}
	}
	if (this.keyMap[" "]) {
		if (this.keyMap[" "] === InputHandler.KeyState.PRESSED) {
			playerMovement.y = 1;
		} else {
			playerMovement.y = -1;
		}
		delete this.keyMap[" "];
	}

	this.game.updatePlayerMovement(playerMovement);
}
