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
