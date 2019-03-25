var shapes = [];
var count;
var current = -1;

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
  rectMode(CENTER);
  createCanvas(1000,800);
  shapes.push(new button_obj(0, 110, 110, 150, 150, 0, 0));
  shapes.push(new button_obj(0, 110, 110, 650, 150, 0, 0));
  makeColors();
  mainCircle = new circle(center,center,300)
  bars.push(new bar())
  circleColor = colors[2][0];
  bgColor = colors[2][1]
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


function draw() {
  clear()
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
  
  fill(51)
  textSize(32)
  text("Happy Birthday P!", 280,120);
  text("<3, B", 320, 720)
  textSize(20)
  text("click and print", 100, 150);
  text("me", 140, 170);
  text("coming soon", 600, 150);
  text("to you :)", 620, 170);
  for(var i=0; i<shapes.length; i++) {
    fill('rgba(20,150,80,.200)');
    stroke(51)
    ellipse(shapes[i].x,shapes[i].y, shapes[i].width, shapes[i].width);
  }
  noStroke()
  
  
}

function mousePressed() {
  for(var n=0; n<shapes.length; n++){
    hit = collidePointCircle(mouseX, mouseY, shapes[n].x, shapes[n].y, shapes[n].width)
    if (hit) {
      count ++;
      shapes[n].width -= 15;
      current = n;
    
    }
  }
}

function mouseReleased(){
  if(current >= 0){
    if(current===0) window.open("happybirthday.pdf");
    if(current===1) window.open("happybirthday.MOV");
    shapes[current].width += 15;
  }
  current = -1;
}

// changes color scheme when mouse is clicked
function mouseClicked() {
  colorindex = ((colorindex+1)%colors.length)
  bgColor = colors[2][1]
  circleColor = colors[2][0];
}


function button_obj(_type, _wdth, _hght,_x, _y, _clicked, _active) {
  this.type = _type;
  this.width = _wdth;
  this.height = _hght;
  this.x = _x;
  this.y = _y;
  this.clicked = _clicked;
  this.active = _active;
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