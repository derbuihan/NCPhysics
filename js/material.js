NK.Point = function () {
	this.mass = 1.0; // default
	this.position = new NK.Vector(3).reset();
	this.position_ = new NK.Vector(3).reset();
	this.position_1 = new NK.Vector(3).reset();
	this.velocity = new NK.Vector(3).reset();
	this.acceleration = new NK.Vector(3).reset();
	this.forces = new Array();
	this.color = '#000';
	this.radius = 3;
	this.gravity = false; // default
	return this;
}

NK.Point.prototype = {

	constructor: NK.Point,
	
	setForce: function (force) {
		return this.forces[this.forces.length] = force;
	},
	
	calculate:function (dt) { // Euler method
		var force = new NK.Vector(3).reset();
		for(var i = 0; i < this.forces.length; i++) {
			this.forces[i].calculate();
			force.plusCopy(this.forces[i].vector);
		}
		this.acceleration.copy(force).multiplyScalarCopy(1.0 / this.mass);
		this.velocity.plusCopy(this.acceleration.multiplyScalar(dt));
		this.position.plusCopy(this.velocity.multiplyScalar(dt));
		for (var i = 0; i < 3; i++) {
			if(Math.abs(this.position.array[i]) > 250) {
				this.velocity.array[i] *= -1;
			}
		}
		return this;
	},

	calculateV:function (dt) {
		var force = new NK.Vector(3).reset();
		for(var i = 0; i < this.forces.length; i++) {
			this.forces[i].calculate();
			force.plusCopy(this.forces[i].vector);
		}
		this.acceleration.copy(force).multiplyScalarCopy(1.0 / this.mass);
		this.position_.copy(this.position);
		this.position.copy(this.position.multiplyScalar(2).minus(this.position_1).plus(this.acceleration.multiplyScalar(dt*dt)));
		this.position_1.copy(this.position_);
		for (var i = 0; i < 3; i++) {
			if(Math.abs(this.position.array[i]) > 250) {
				this.velocity.array[i] *= -1;
			}
		}
		return this;
	},
	
	drow: function(canvas, axis) {
		var v = new NK.Vector(3).reset();
		v.copy(this.position.minus(axis.vector).multiplyMatrix(axis.matrix)).multiplyScalarCopy(1 / v.array[2]);
		canvas.arcVector(v, this.radius, this.color);
		return this;
	}
}

NK.Line = function () {
	this.position_1 = new NK.Vector(3).reset();
	this.position_2 = new NK.Vector(3).reset();
	this.width = 3;
	this.color = '#000';
	return this;
}

NK.Line.prototype = {

	constructor: NK.Line,

	drow: function(canvas, axis) {
		var v1 = new NK.Vector(3).reset();
		v1.copy(this.position_1.minus(axis.vector).multiplyMatrix(axis.matrix)).multiplyScalarCopy(1 / v1.array[2]);
		var v2 = new NK.Vector(3).reset();
		v2.copy(this.position_2.minus(axis.vector).multiplyMatrix(axis.matrix)).multiplyScalarCopy(1 / v2.array[2]);
		canvas.lineVector(v1, v2, this.width, this.color)
		return this;
	}
}

NK.Plane = function () {
	this.position = new NK.Vector(3).reset();
	this.position_1 = new NK.Vector(3).reset();
	this.position_2 = new NK.Vector(3).reset();
	this.position_3 = new NK.Vector(3).reset();
}

NK.Plane.prototype = {

	constructor: NK.Plane,

	drow: function(canvas, asix) {

	}
}

