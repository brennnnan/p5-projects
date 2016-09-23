circles = []
cw = 1200;
ch = 800;
wid = 40;
click = 0;
counter = 0

function setup() {
  createCanvas(cw,ch);
  //frameRate(2)
  noStroke();
  for(var i=150; i<(cw-150); i+=(wid+wid)) {
    for(var h=150; h<(ch-150); h+=(wid+wid)) {
      circles.push(new dot(i,h,wid,200));
    }
  }
}

function draw() {
  background(240)
  for(var d=0; d<circles.length;d++) {
    
    //uncomment this line for circles to change colors
    //circles[d].newcolor()
    if(circles[d].clicked){
      var gravity = createVector(0,0.1*circles[d].mass)
      circles[d].applyForce(gravity);
      circles[d].update();
      circles[d].sketch();
      circles[d].checkEdges();
    } else {
      circles[d].sketch();
    }
  }
}

function mouseClicked(){
  click = 1;
  for(var f=0; f<circles.length; f++) {
    hit = collidePointCircle(mouseX,mouseY,circles[f].position.x,circles[f].position.y,circles[f].width);
    if(hit) {
      //circles[f].newcolor();
      circles[f].clicked = 1;
      break;
    }
  }
}

function dot(_x,_y,_width,_mass) {
  this.position = createVector(_x,_y);
  this.width = _width;
  this.mass = _mass;
  this.clicked = 0;
  //this.mass += random(0,100)
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,0);
  
  var r = random(0,255);
  var g = random(0,255);
  var b = random(0,255);
  this.rgb = [r,g,b];
  
  this.applyForce = function(force) {
    var f = p5.Vector.div(force,20);
    this.acceleration.add(f);
  }
  
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  this.checkEdges = function() {
    if(this.position.y > (height-(wid/2))) {
      this.velocity.y *= -.9;
      this.position.y = height-(wid/2);
    }
  }
  
  this.newcolor = function() {
    this.rgb = [random(0,255),random(0,255),random(0,255)];
  }
  
  this.sketch = function() {
    fill(this.rgb)
    ellipse(this.position.x,this.position.y,this.width,this.width);
  }
}