NK.Axis = function () {
	this.vector = new NK.Vector(3).reset();
	this.matrix = new NK.Matrix(3, 3).identity();
	this.calculate = function () {
		return this;
	};
}

NK.Axis.prototype = {
	constructor: NK.Axis,

	CMSystem: function(world) { // center of Mass system
		this.calculate = function() {
			var mass = 0;
			this.vector.reset();
			for(var i = 0; i < world.materials.length; i++) {
				mass += world.materials[i].mass;
				this.vector.plusCopy(world.materials[i].position.multiplyScalar(world.materials[i].mass));
			}
			return this.vector.multiplyScalarCopy(1.0 / mass);
		}
	},

	Axis3D: function(position, ex, ey, origin) {
		this.calculate = function() {
			var m = new NK.Matrix(3,3).set(ex.array[0], ey.array[0], position.array[0], ex.array[1], ey.array[1], position.array[1], ex.array[2], ey.array[2], position.array[2]).inverseCopy();
			this.matrix.copy(m);
			this.vector.copy(origin);
			return this;
		}
	}
}
