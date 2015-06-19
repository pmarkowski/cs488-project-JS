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
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.GL_ONE_MINUS_SRC_ALPHA);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

	// Create our mappings
	this.shaderMap = {};
	this.meshMap = {};
	this.particleSystemMap = {};
	this.textureMap = {};
	this.normalMapMap = {};
}

Viewer.prototype.loadResources = function() {
	for (var i = 0; i < this.drawableGameObjects.length; i++) {
		this.drawableGameObjects[i].loadResources(this);
	}
	this.resourcesLoaded = true;
}

Viewer.prototype.setBackgroundColour = function(colour) {
	gl.clearColor(colour.r, colour.g, colour.b, 1.0);
}

Viewer.prototype.resize = function(width, height) {
	// TODO
}

Viewer.prototype.paintGL = function() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	if (!this.resourcesLoaded) {
		return;
	}

	this.vMatrix = camera.getCameraMatrix();

	for (var i = 0; i < this.drawableGameObjects.length; i++) {
		this.drawableGameObjects[i].render(this);
	}
}

/*
 * Resource Loading and Management
 */

Viewer.prototype.getShaderKey = function(vertShaderFile, fragShaderFile) {
	return vertShaderFile + fragShaderFile;
};

Viewer.prototype.loadShader = function(vertShaderFile, fragShaderFile) {
	var shaderKey = this.getShaderKey(vertShaderFile, fragShaderFile);

	if (!this.shaderMap[shaderKey]) {
		
	}
};
