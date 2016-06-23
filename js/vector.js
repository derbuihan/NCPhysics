NK.Vector = function () {
	count++;
	this.array = new Array();
	this.array.length = arguments[0];
	return this;
}

NK.Vector.prototype = {
	constructor: NK.Vector,
	
	set: function () {
//		if (this.array.length != arguments.length) { return undefined; }
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = arguments[i];
		}
		return this;
	},
	
	reset: function () {
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = 0;
		}
		return this;
	},
	
	copy: function (vector) {
//		if (this.array.length != vector.array.length) { return undefined; }
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = vector.array[i];
		}
		return this;
	},
	
	plus: function (vector) {
//		if (this.array.length != vector.array.length) { return undefined; }
		var r = new NK.Vector(this.array.length).reset();
		for (var i = 0; i < this.array.length; i++) {
			r.array[i] = this.array[i] + vector.array[i];
		}
		return r;
	},
	
	plusCopy: function (vector) {
//		return this.copy(this.plus(vector));
//		if (this.array.length != vector.array.length) { return undefined; }
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] += vector.array[i];
		}
		return this;
	},
	
	minus: function (vector) {
//		if (this.array.length != vector.array.length) { return undefined; }
		var r = new NK.Vector(this.array.length).reset();
		for (var i = 0; i < this.array.length; i++) {
			r.array[i] = this.array[i] - vector.array[i];
		}
		return r;
	},
	
	minusCopy: function (vector) {
//		return this.copy(this.minus(vector));
//		if (this.array.length != vector.array.length) { return undefined; }
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] -= vector.array[i];
		}
		return this;
	},
	
	multiplyScalar: function (scalar) {
		var r = new NK.Vector(this.array.length).reset();
		if (scalar != 0) {
			for (var i = 0; i < this.array.length; i++) {
				r.array[i] = this.array[i] * scalar;
			}
		}
		return r;
	},
	
	multiplyScalarCopy: function (scalar) {
//		return this.copy(this.multiplyScalar(vector));
		if (scalar != 0) {
			for (var i = 0; i < this.array.length; i++) {
				this.array[i] *= scalar;
			}
		}else{
			this.reset();
		}
		return this;
	},
	
	dot: function (vector) {
//		if (this.array.length != vector.array.length) { return undefined; }
		var r = 0;
		for (var i = 0; i <this.array.length; i++) {
			r += this.array[i] * vector.array[i];
		}
		return r;
	},
	
	multiplyMatrix: function (matrix) {
//		if (matrix.array[0].length != this.array.length) { return undefined; }
		var r = new NK.Vector(matrix.array.length).reset();
		for (var j = 0; j < matrix.array[0].length; j++) {
			if(this.array[j] != 0) {
				for (var i = 0; i < matrix.array.length; i++) {
					r.array[i] += matrix.array[i][j] * this.array[j];
				}
			}
		}
		return r;
	},
	
	multiplyMatrixCopy: function (matrix) {
		return this.copy(this.multiplyMatrix(matrix));
	},
	
	cross: function (vector) {
//		if ( (this.array.length != 3) || (vector.array.length != 3) ) { return undefined; }
		return new NK.Vector(3).set(
			this.array[1] * vector.array[2] - this.array[2] * vector.array[1],
			this.array[2] * vector.array[0] - this.array[0] * vector.array[2],
			this.array[0] * vector.array[1] - this.array[1] * vector.array[0]
		);
	},
	
	crossCopy: function (vector) {
		return this.copy(this.cross(vector));
	},
	
	distance: function () {
		var r = 0;
		for (var i = 0; i < this.array.length; i++) {
			r += this.array[i] * this.array[i];
		}
		return Math.sqrt(r);
	}
}	
