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
