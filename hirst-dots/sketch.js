circles = []
cw = 1200;
ch = 800;
wid = 80;
click = 0;
counter = 0
lines = []

function setup() {
  createCanvas(cw,ch);

  for(var i=150; i<(cw-300); i+=(wid+wid/4)) {
    for(var h=150; h<(ch-150); h+=(wid+wid/4)) {
      circles.push(new dot(i+(h/2)-100,h-counter,wid,200));
      
    }
    
    counter+=4;
  }
}

function draw() {
  background(200)
  for(var d=0; d<circles.length;d++) {
    //uncomment this line to make circles change colors
    //circles[d].newcolor()
    drawlines()
    if(click>0){
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

function drawlines() {
  for (var t=0; t<lines.length; t++) {
    line(lines[t].x1,lines[t].y2,lines[t].x2,lines[t].y2)
  }
}

function mouseClicked(){
  click = 1;
  console.log(circles.length)
  for(var f=0; f<circles.length; f++) {
    hit = collidePointCircle(mouseX,mouseY,circles[f].position.x,circles[f].position.y,circles[f].width);
    if(hit) {
      circles[f].newcolor();
      break;
    }
  }
}

function dot(_x,_y,_width,_mass) {
  this.position = createVector(_x,_y);
  this.width = _width;
  this.mass = _mass;
  //this.mass += random(0,100)
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,0);
  
  var r = round(random(0,255));
  var g = round(random(0,255));
  var b = round(random(0,255));
  this.rgb = [r,g,b];
  
  this.applyForce = function(force) {
    var f = p5.Vector.div(force,200);
    this.acceleration.add(f);
  }
  
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  this.checkEdges = function() {
    if(this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
  
  this.newcolor = function() {
    r = round(random(0,255));
    g = round(random(0,255));
    b = round(random(0,255));
    this.rgb = [r,g,b];
  }
  
  this.sketch = function() {
    fill(this.rgb)
    ellipse(this.position.x,this.position.y,this.width,this.width);
  }
}

function bar(x1_,y1_,x2_,y2_){
  this.x1 = x1_;
  this.y1 = y1_;
  this.x2 = x2_;
  this.y2 = y2_;
}