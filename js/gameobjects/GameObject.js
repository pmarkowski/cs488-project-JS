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