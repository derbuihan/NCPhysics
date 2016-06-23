NK.Matrix = function (m, n) {
	this.array = new Array();
	this.array.length = m;
	for (var i = 0; i < m; i++) {
		this.array[i] = new Array();
		this.array[i].length = n;
		for (var j = 0; j < n; j++) {
			this.array[i][j] = 0
		}
	}
	return this;
}

NK.Matrix.prototype = {
	constructor: NK.Matrix,
	
	set: function () {
		var m = this.array.length, n = this.array[0].length;
//		if (arguments.length != m * n) { return undefined; }
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				this.array[i][j] = arguments[i * n + j];
			}
		}
		return this;
	},
	
	reset: function () {
		var m = this.array.length, n = this.array[0].length;
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				this.array[i][j] = 0;
			}
		}
		return this;
	},
	
	copy: function (matrix) {
		var m = this.array.length, n = this.array[0].length;
//		if ( (m != matrix.array.length) || (n != matrix.array[0].length) ) { return undefined; }
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				this.array[i][j] = matrix.array[i][j];
			}
		}
		return this;
	},
	
	identity: function () {
//		if ( this.array.length != this.array[0].length ) { return undefined; }
/*
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[0].length; j++) {
				this.array[i][j] = (i==j)? 1: 0;
			}
		}
*/
		this.reset();
		for (var i = 0; i < this.array.length; i++) {
			this.array[i][i] = 1;
		}
		return this;
	},
	
	plus: function (matrix) {
		var m = this.array.length, n = this.array[0].length;
//		if ( (m != matrix.array.length)&&(n != matrix.array[0].length) ) { return undefined; }
		var r = new NK.Matrix(m, n);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++){
				r.array[i][j] = this.array[i][j] + matrix.array[i][j];
			}
		}
		return r;
	},
	
	plusCopy: function (matrix) {
//		return this.copy(this.plus(matrix));
//		if ( (m != matrix.array.length)&&(n != matrix.array[0].length) ) { return undefined; }
		var m = this.array.length, n = this.array[0].length;
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++){
				this.array[i][j] += matrix.array[i][j];
			}
		}
		return this;
	},
	
	minus: function (matrix) {
		var m = this.array.length, n = this.array[0].length;
//		if ( (m != matrix.array.length)&&(n != matrix.array[0].length) ) { return undefined; }
		var r = new NK.Matrix(m, n);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++){
				r.array[i][j] = this.array[i][j] - matrix.array[i][j];
			}
		}
		return r;
	},
	
	minusCopy: function (matrix) {
//		return this.copy(this.minus(matrix));
		var m = this.array.length, n = this.array[0].length;
//		if ( (m != matrix.array.length)&&(n != matrix.array[0].length) ) { return undefined; }
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++){
				this.array[i][j] -= matrix.array[i][j];
			}
		}
		return this;
	},

	multiplyScalar: function (scalar) {
		var m = this.array.length, n = this.array[0].length;
		var r = new NK.Matrix(m, n);
		if (scalar != 0) {
			for (var i = 0; i < m; i++) {
				for (var j = 0; j < n; j++){
					r.array[i][j] = scalar * this.array[i][j];
				}
			}
		}
		return r;
	},
	
	multiplyScalarCopy: function (scalar) {
//		return this.copy(this.multiplyScalar(scalar));
		var m = this.array.length, n = this.array[0].length;
		if (scalar != 0) {
			for (var i = 0; i < m; i++) {
				for (var j = 0; j < n; j++){
					this.array[i][j] *= scalar;
				}
			}
		}else{
			this.reset();
		}
		return this;
	},
	
	multiplyMatrix: function (matrix) {
		var m = this.array.length, n = this.array[0].length;
//		if (this.array[0].length != matrix.array.length) { return undefined; }
		var r = new NK.Matrix(m, n);
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < matrix.array[0].length; j++) {
				for (var k = 0; k < n; k++) {
					r.array[i][j] += this.array[i][k] * matrix.array[k][j];
				}
			}
		}
		return r;
	},
	
	multiplyMatrixCopy: function (matrix) {
		return this.copy(this.multiplyMatrix(matrix));
	},

	rotation: function (radian) {
//		if ( (this.array.length !=2) || (this.array[0].length != 2) ) { return undefined; }
		var c = Math.cos(radian), s = Math.sin(radian);
		return this.set(
			c, -s,
			s,  c
		);
	},
	
	rotationX: function (radian) {
//		if ( (this.array.length != 3) || (this.array[0].length != 3)) { return undefined; }
		var c = Math.cos(radian), s = Math.sin(radian);
		return this.set(
			 c, -s,  0,
		 	 s,  c,  0,
			 0,  0,  1
		);
	},
	
	rotationY: function (radian) {
//		if ( (this.array.length != 3) || (this.array[0].length != 3)) { return undefined; }
		var c = Math.cos(radian), s = Math.sin(radian);
		return this.set(
			 c,  0, -s,
			 0,  1,  0,		
			 s,  0,  c
		);
	},
	rotationZ: function (radian) {
//		if ( (this.array.length != 3) || (this.array[0].length != 3)) { return undefined; }
		var c = Math.cos(radian), s = Math.sin(radian);
		return this.set(
			 1,  0,  0,
			 0,  c, -s,
			 0,  s,  c
		);
	},
	
	determinant: function () {
		var m = this.array.length, n = this.array[0].length;
//		if (m != n) { return undefined; }
		var r = 0;
		if ( (m == 1) && (n == 1) ) {
			r = this.array[0][0];
		}else{
			for (var i = 0; i < n; i++) {
				if ( this.array[0][i] != 0 ) {
					r += this.array[0][i] * this.cofactor(0,i);
				}
			}
		}
		return r;
	},
	
	cofactor: function (m, n) {
		var r = new NK.Matrix(this.array.length - 1, this.array[0].length - 1);
		for (var i = 0; i < r.array.length; i++) {
			for (var j = 0; j < r.array[0].length; j++) {
				r.array[i][j] = this.array[i+((i < m)? 0: 1)][j+((j < n)? 0: 1)];
			}
		}
		return (((n + m) % 2 == 0)? 1: -1) * r.determinant();
	},
	
	cofactorMatrix: function () {
		var m = this.array.length, n = this.array[0].length;
//		if (m != n) { return undefined; }
		var r = new NK.Matrix(m, n);
		for (var i = 0; i < m; i++) {
			for(var j = 0; j < n; j++) {
				r.array[i][j] = this.cofactor(i, j);
			}
		}
		return r;
	},
	
	cofactorMatrixCopy: function () {
		return this.copy(this.cofactorMatrix());
	},
	
	inverse: function () {
//		if (m != n) { return undefined; }
		var r = new NK.Matrix(this.array.length, this.array[0].length);
		return r.copy(this).cofactorMatrix().multiplyScalar(1.0 / r.determinant()).transpose();
	},
	
	inverseCopy: function () {
		var determinant = this.determinant();
		return this.cofactorMatrixCopy().multiplyScalarCopy(1.0 / determinant).transposeCopy();
	},
	
	transpose: function () {
		var m = this.array.length, n = this.array[0].length;
		var r = new NK.Matrix(n, m);
		for (var i = 0; i < m; i++){
			for (var j = 0; j < n; j++){
				r.array[j][i] = this.array[i][j];
			}
		}
		return r;
	},
	
	transposeCopy: function () {
		return this.copy(this.transpose());
	}
}

