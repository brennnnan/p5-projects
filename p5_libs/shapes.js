function circle(_x, _y, _w, _rgb) {
	this.x = _x;
	this.y = _y;
	this.width = _w;
	this.rgb = _rgb;


	this.sketch = function() {
		fill(this.rgb[0], this.rgb[1], this.rgb[2]);
		ellipse(this.x, this.y, this.width, this.width);
	}

	this.expand = function() {
		this.width++;
	}

	this.shrink = function(num) {
		this.width-=num;
	}
}


// RECTMODE must be CENTER!
function square(_x, _y, _w, _rgb) {
	this.x = _x;
	this.y = _y;
	this.width = _w;
	this.rgb = _rgb;

	this.sketch = function() {
		fill(this.rgb[0], this.rgb[1], this.rgb[2]);
		rect(this.x, this.y, this.width, this.width);
	}

	this.expand = function(num) {
		this.width+=num;
	}

	this.shrink = function(num) {
		this.width-=num;
	}
}