Audio.playSound = function (soundFile) {
	var sound = new Audio(soundFile);
	sound.play();
}
var GAME_FPS = 60;

var GAME_INTERVAL_S  = (1.0 / GAME_FPS);
var GAME_INTERVAL_MS = (1.0 / GAME_FPS * 1000);

var USE_CEL_SHADING;
var INTERPOLATE_ANIMATIONS;
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
		console.log(this.keyMap);
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

	// console.log("moved mouse! deltaX: " + deltaX + " deltaY: " + deltaY);
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
// Converts from degrees to radians.
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
}

// Converts from radians to degrees.
Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
}
var gl;

function initWebGL(canvas) {
	gl = null;

	try {
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e) {}

	if (!gl) {
		alert("Unable to initialize WebGL. Your browser may not support it.");
		gl = null;
	}

	return gl;
}

function start() {
	var canvas = document.getElementById("glcanvas");

	gl = initWebGL(canvas);

	if (gl) {
		var viewer       = new Viewer();
		var inputHandler = new InputHandler();
		var game         = new Game(viewer, inputHandler);

		// Redirect events to our inputHandler
		document.onmousemove = function(event) {
			inputHandler.mouseMoveEvent(event);
		};
		document.onkeydown   = function(event) {
			inputHandler.keyPressEvent(event);
		};
		document.onkeyup     = function(event) {
			inputHandler.keyReleaseEvent(event);
		};

		var lvl1 = "data/level1.js";
		game.loadLevel(lvl1);

		console.log("Starting the game!");
		setInterval(function () {
			game.update();
		}, GAME_INTERVAL_MS);
	}
}
var GameObject = function () {
	this.translation = new THREE.Vector3();
	this.scale       = new THREE.Vector3(1, 1, 1);
	this.rotation    = new THREE.Matrix4();
	this.velocity    = new THREE.Vector3();
}

GameObject.prototype.translate = function(x, y, z) {
	this.translation.add(new THREE.Vector3(x, y, z));
};

GameObject.prototype.scale = function(x, y, z) {
	this.scale.multiply(new THREE.Vector3(x, y, z));
};

GameObject.prototype.rotate = function(axis, angle) {
	var rotationAxis = new THREE.Vector3();

	switch (axis) {
		case "x":
			rotationAxis.x = 1;
			break;
		case "y":
			rotationAxis.y = 1;
			break;
		case "z":
			rotationAxis.z = 1;
			break;
	}

	this.rotation.makeRotationAxis(rotationAxis, Math.radians(angle));
};

GameObject.prototype.getModelTransform = function() {
	var transform = new THREE.Matrix4();

	transform.makeTranslation(this.translation.x, this.translation.y, this.translation.z);
	transform.scale(this.scale);
	transform.multiply(this.rotation);

	return transform;
};
var Level = function () {
	this.backgroundColour    = new THREE.Color();
	this.ambientLight        = new THREE.Color();
	this.lightSources        = [];
	this.drawableGameObjects = [];
}

Level.prototype.setCamera = function(camera) {
	this.camera = camera;
	this.setCameraFocus();
}

Level.prototype.setPlayer = function(player) {
	this.player = player;
	this.addDrawableGameObject(player);
	this.setCameraFocus();
}

Level.prototype.setGoal = function(goal) {
	this.goal = goal;
	this.addDrawableGameObject(goal);
};

Level.prototype.setCameraFocus = function() {
	if (this.camera && this.player) {
		this.camera.setFocus(this.player.getTranslation());
	}
};

Level.prototype.addLight = function(light) {
	this.lightSources.push(light);
};

Level.prototype.addDrawableGameObject = function(obj) {
	this.drawableGameObjects.push(obj);
};
Light.LightType = {
	POINT       : 0,
	DIRECTIONAL : 1
}

function Light (type, colour, falloff) {
	GameObject.call(this);

	this.type    = type;
	this.colour  = colour;
	this.falloff = falloff;
}

Light.prototype = Object.create(GameObject.prototype);

Light.prototype.constructor = Light;

Light.prototype.getPosition = function() {
	return new THREE.Vector4(this.translation.x, this.translation.y, this.translation.z, this.type);
};
var Viewer = function() {
	this.mMatrix = new THREE.Matrix4();
	this.vMatrix = new THREE.Matrix4();
	this.pMatrix = new THREE.Matrix4();

	this.resourcesLoaded = false;
	this.isShadowMapping = false;

	// Initialize our gl values
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
}
