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
