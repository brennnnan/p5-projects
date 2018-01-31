cwidth = 800
center = cwidth/2
var mainCircle; 
bars = []
ticker = 0;
var bgColor, circleColor;

// n = how many loops before new bar
var n = 40;

// used to store color schemes and indicate which one is chosen
colors = [];
colorindex = 0;

function setup() {
  //makeBoxes();
  rectMode(CENTER);
  createCanvas(cwidth,cwidth)
  makeColors();
  mainCircle = new circle(center,center,300)
  bars.push(new bar())
  circleColor = colors[colorindex][0];
  bgColor = colors[colorindex][1]
}

// populates array full of alternate color schemes
function makeColors() {
  colors.push(["rgb(205,230,245)","rgb(141,167,190)"])
  colors.push(["rgb(24,169,153)","rgb(72,67,73)"])
  colors.push(["rgb(24,169,153)","rgb(242,244,243)"])
  colors.push(["rgb(237,242,244)","rgb(43,45,66)"])
  colors.push(["rgb(192,248,209)","rgb(189,207,181)"])
  colors.push(["rgb(141,177,171)","rgb(88,119,146)"])
  colors.push(["rgb(80,81,104)","rgb(179,192,164)"])
  colors.push(["rgb(34,34,34)","rgb(99,159,171)"])
}

// changes color scheme when mouse is clicked
function mouseClicked() {
  colorindex = ((colorindex+1)%colors.length)
  bgColor = colors[colorindex][1]
  circleColor = colors[colorindex][0];
}

function draw() {
  // draws a new bar every n loops
  if((ticker++ %n) === 0) {
    bars.push(new bar())
  }
  
  background(bgColor)
  fill(circleColor)
  
  mainCircle.sketch();
  
  for(var i=0; i<bars.length; i++) {
    bars[i].sketch()
  }
  
  //noFill();
  //stroke(colors[colorindex][0]);
  //mainCircle.sketch();
}


function circle(_x,_y,_w) {
  this.x = _x;
  this.y = _y;
  this.width = _w;
  
  this.sketch = function() {
    ellipse(this.x,this.y,this.width,this.width);
  }
  
}

function bar() {
  this.middle = 200;
  this.height = 10
  this.sketch = function() {
    fill(bgColor);
    noStroke();
    rect(center,this.middle,mainCircle.width,this.height);
    this.middle +=.5;
    if(this.middle >= 650) {
      bars.shift();
    } 
    
    
  }
}