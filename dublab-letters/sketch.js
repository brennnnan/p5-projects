ds = []
us = []
var counter = 0;
var u;

function setup() {
  createCanvas(1200,800);
  rectMode(CENTER)
  
  // push ds
  for(var g=1; g<=10; g++) {
    ds.push(new closedLetter(500,400,g*50,g*50,4*PI/3, 2*PI/3))
  }
  
  u = new vertexShape(4, [[400,300],[400,700],[650,700],[640,300]])

  
}

function draw() {
  clear();
  noFill();
  
  //u.sketchInstant();
// draw ds
  for(var i=0; i<ds.length; i++) {
    //fill(round(random(255)),round(random(255)),round(random(255)))
    ds[i].sketch();
  }
  

}


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

function closedLetter(_x, _y, _w, _h, _start, _end) {
  this.x = _x;
  this.y = _y;
  this.w = _w;
  this.h = _h;
  this.start = _start;
  this.end = _end;
  this.upper = 800;
  
  this.sketch = function() {
    arc(this.x, this.y, this.w, this.h, this.start, this.end, CHORD);
    this.w = (this.w+1)%this.upper+50;
    this.h = (this.h+1)%this.upper+50;
  }
}

function openLetter(_vertices) {
  this.vertices = _vertices;
  
  this.sketch = function() {
    beginShape();
    for (var u=0; u<this.vertices.length; u++) {
      curveVertex(this.vertices[u][0],this.vertices[u][1]);
    }
    endShape();
  }
}

function vertexShape(_num, _vertices) {
  this.numVertices = _num;
  this.vertices = _vertices;
  
  this.sketchInstant = function() {
    beginShape()
    for(var i=0; i<this.numVertices; i++) {
      vertex(this.vertices[i][0], this.vertices[i][1]);
    }
    endShape()
  }
  
}