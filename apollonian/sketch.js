circles = [];
cw = 800;
ch = 800;
function setup() {
  createCanvas(cw, ch);
  makeApollonian()
}

function draw() {
  stroke(51)
  for(var i=0; i<circles.length; i++) {
    circles[i].sketch();
  }
  //line(cw/2,1,cw/2,ch);
  //line(0,0,cw,ch);
  //line(cw,0,0,ch);
  var widthMid = 160
  ellipse(cw/2,ch/2,widthMid,widthMid)
  
  point1 = [cw/2 + 152 + cos(60),ch/2 + 152 + sin(60)]
  console.log(point1[1])
  fill(10)
  
  noFill()
  ellipse(point1[0],point1[1],270,270)
  noFill()
  
  point1 = [cw/2 - 152 + cos(60),ch/2 - 152 + sin(60)]
  console.log(point1[1])
  fill(10)
  
  noFill()
  ellipse(point1[0],point1[1],270,270)
  noFill()
  
  point1 = [cw/2 - 152 + cos(60),ch/2 + 152 + sin(60)]
  console.log(point1[1])
  fill(10)
  
  noFill()
  ellipse(point1[0],point1[1],270,270)
  noFill()
  
  point1 = [cw/2 + 152 + cos(60),ch/2 - 152 + sin(60)]
  console.log(point1[1])
  fill(10)
  
  noFill()
  ellipse(point1[0],point1[1],270,270)
  noFill()
}

function circle(x, y, diam) {
  this.x = x;
  this.y = y;
  this.diam = diam;
  this.shade = [80,149,200];
  
  this.update = function() {
  
  }
  
  this.sketch = function() {
    this.update()
    //noStroke();
    //fill(this.shade);
    ellipse(this.x,this.y,this.diam,this.diam)
  }
}

function mouseClicked() {
  var y = random(30,100);
  circles.push(new circle(mouseX, mouseY, y, y))
}

function makeApollonian() {
  //start with big circle
  circles.push(new circle(cw/2,ch/2,ch-100,ch-100))
  var radius = (ch-100)/2;
  
  
}