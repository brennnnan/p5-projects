var cwidth = 1000;
var cheight = 800;
var myCircles = [];
var myCircle = new circle(cwidth/2, cheight/2, 150, 120, 200, 240);
myCircles.push(myCircle);

function setup() {
  createCanvas(cwidth, cheight);
  background(100,240,140);
}


function draw() {
  clear();
  background(100,240,140);
  for(var i=0; i<myCircles.length; i++) {
    myCircles[i].sketch()
  }
}

function circle(x, y, diam, r, g, b) {
  this.x = x;
  this.y = y;
  this.diam = diam;
  this.shade = [r,g,b];
  
  this.update = function() {
    
    yTransform = randomGaussian(10,3)-10;
    
    
    this.y = this.y + yTransform;
  }
  
  this.sketch = function() {
    this.update()
    noStroke();
    fill(this.shade);
    ellipse(this.x,this.y,this.diam,this.diam)
  }
}


function mouseClicked() {
  myCircles.push(new circle(mouseX, mouseY, random(50,200), random(120,140), random(200,220), random(235,255)));
}





