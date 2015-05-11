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
};

function start() {
	var canvas = document.getElementById("glcanvas");
	
	gl = initWebGL(canvas);
	
	if (gl) {
		var viewer = new Viewer();
		var game = new Game(viewer);
		var inputHandler = new InputHandler();
		
		// Hook up events
		document.onmousemove = inputHandler.mouseMoveEvent;
		document.onkeydown = inputHandler.keyPressEvent;
		document.onkeyup = inputHandler.keyReleaseEvent;
		
		inputHandler.setGame(game);
		
		var lvl1 = "data/level1.js";
		game.loadLevel(lvl1);
		
		game.start();
	}
};