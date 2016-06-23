NK.Force = function() {
	this.vector = new NK.Vector(3).reset();
	this.calculate = function () {
		return this;
	};
}

NK.Force.prototype = {
	constructor: NK.Force,

	rotation: function (R) {
		this.calculate = function () {
			return this.vector.set(R * Math.cos(world.time), R * Math.sin(world.time),0);
		}
	},

	gravity: function (A, B) { // A and B are materials.
		this.calculate = function () {
			var r = new NK.Vector(A.position.array.length).copy( B.position.minus(A.position) );
			return this.vector.copy(r.multiplyScalar(G * A.mass * B.mass / Math.pow(r.distance(), 3)));
		}
	}
}
