circles = []
var i = 0;
function setup() {
  createCanvas(1000,800);
  makeCircles()
}

function draw() {
  frameRate(map(mouseX, 0,width,2,60))
  noStroke()
  for(i=0; i<circles.length; i++) {
    circles[i].sketch();
  }
}

function makeCircles() {
  w = 30;
  circles.push(new dot(width/2,height/2 - 30,w,0))
  circles.push(new dot(width/2 + 50, height/2, w, 42))
  circles.push(new dot(width/2+50, height/2 + 50,w,84))
  circles.push(new dot(width/2, height/2 + 80, w, 126))
  circles.push(new dot(width/2-50,height/2+50, w, 168))
  circles.push(new dot(width/2-50,height/2,w,210))
  
}



function dot(_x,_y,_width,_grayscale) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.grayscale = _grayscale;
  
  
  
  this.sketch = function() {
    fill(this.grayscale,this.grayscale,this.grayscale)
    ellipse(this.x,this.y,this.width,this.width)
    this.grayscale = this.grayscale-=8
    if(this.grayscale < 0) this.grayscale = 255+this.grayscale;
  }
  
}