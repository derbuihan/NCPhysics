NK.Canvas = function (context, width, height) {
	this.canvas = context;
	this.width = width;
	this.height = height;
	this.widthHalf = width / 2;
	this.heightHalf = height / 2;
}

NK.Canvas.prototype = {
	constructor: NK.Canvas,
	
	arc: function (x, y, radius, color) {
		this.canvas.beginPath();
		this.canvas.arc( x + (this.widthHalf), -y + (this.heightHalf), radius, 0, 2*PI, false );
		this.canvas.closePath();
		this.canvas.fillStyle = color;
		this.canvas.fill();
		return this;
	},

	arcVector: function (vector, radius, color) {
		this.arc(vector.array[0], vector.array[1], radius, color);
		return this;
	},
	
	line: function (x1, y1, x2, y2, width, color) {
		this.canvas.beginPath();
		this.canvas.moveTo(x1 + (this.widthHalf), -y1 + (this.heightHalf));
		this.canvas.lineTo(x2 + (this.widthHalf), -y2 + (this.heightHalf));
		this.canvas.closePath();
		this.canvas.strokeStyle = color;
		this.canvas.lineWidth = width;
		this.canvas.stroke();
	},
	
	lineVector: function (vector1, vector2, width, color) {
		this.line(vector1.array[0], vector1.array[1], vector2.array[0], vector2.array[1], width, color);
		return this;
	},
	
	drowAxisLine2D: function (width, height, widthNumber, heightNumber) {
		var dx = width / widthNumber, dy = height / heightNumber;
		for(var i = -widthNumber / 2; i <= widthNumber / 2; i++ ) {
			this.line(dx * i, -this.heightHelf, dy * i, this.heightHelf, 1, '#777');
		}
		for(var j = -heightNumber / 2; j <= heightNumber / 2; j++ ) {
			this.line(-this.widthHelf, dx * j, this.widthHelf, dx * j, 1, '#777');
		}
		return this;
	},

	drowAxisLine3D: function (width, height, length, widthNumber, heightNumber, lengthNumber) {
		var dx = width / widthNumber, dy = height / heightNumber, dz = length / lengthNumber;
		for(var i = -widthNumber / 2; i <= widthNumber / 2; i++ ) {
			this.line(dx * i, -this.heightHelf, dy * i, this.heightHelf, 1, '#777');
		}
		for(var j = -heightNumber / 2; j <= heightNumber / 2; j++ ) {
			this.line(-this.widthHelf, dx * j, this.widthHelf, dx * j, 1, '#777');
		}
		for(var j = -lengthNumber / 2; j <= lengthNumber / 2; j++ ) {
			this.line(-this.widthHelf, dx * j, this.widthHelf, dx * j, 1, '#777');
		}
		return this;
	}
	
}
