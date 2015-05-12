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
