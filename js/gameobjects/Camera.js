function Camera () {
	GameObject.call(this);

	this.up = new THREE.Vector3(0, 1, 0);

	this.withinUpLimit = function (fromVector) {
		var epsilon = 0.5;

		return !(fromVector.y != 0
			&& -epsilon < fromVector.x && fromVector.x < epsilon
			&& -epsilon < fromVector.z && fromVector.z < epsilon);
	}
}

Camera.prototype = Object.create(GameObject.prototype);

Camera.prototype.constructor = Camera;

Camera.prototype.setFocus = function(focusPoint) {
	this.focus = focusPoint;
};

Camera.prototype.getLeftVector = function() {
	var crossProd = new THREE.Vector3();
	crossProd.crossVectors(this.up, this.focus - this.translation);
};

Camera.prototype.rotateAroundFocus = function(x, y) {
	if (x != 0) {
		var fromFocus = new THREE.Vector3();
		fromFocus.subVectors(this.focus - this.translation);

		var rotMatrix = new THREE.Matrix4();
		rotMatrix.makeRotationAxis(this.up, Math.radians(x));
		//TODO: convert this
		/*
		fromFocus = rotMatrix * fromFocus;
        mTranslation = mFocus - fromFocus;
		*/
	}

	if (y != 0) {
		var fromFocus = new THREE.Vector3();
		fromFocus.subVectors(this.focus - this.translation);

		var rotMatrix = new THREE.Matrix4();
		var pivot = this.getLeftVector();
		rotMatrix.makeRotationAxis(pivot, Math.radians(y));

		//TODO: convert this
		/*
		fromFocus = rotMatrix * fromFocus;
		*/

		if (this.withinUpLimit(fromFocus)) {
			this.translation = this.focus - fromFocus;
		}
	}
};

Camera.prototype.getCameraMatrix = function() {
	var cameraMatrix = new THREE.Matrix4();
	cameraMatrix.lookAt(this.translation, this.focus, this.up);
	return cameraMatrix;
};
