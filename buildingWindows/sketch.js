var canvasHeight = 600;
var canvasWidth = 400;
boxHeight = 500
windows = [];

function setup() {
  rectMode(CENTER)
  canvas = createCanvas(canvasWidth, canvasHeight)
  makeWindows()
  frameRate(10)
}

function draw() {
  
  background(100,50,200)
  fill(200,200,200)
  rect(canvasWidth/2, canvasHeight-(boxHeight/2), 200, boxHeight, 10, 10, 10, 10);
  drawWindows();
}

function drawWindows() {
  
  for(var n=0; n<windows.length; n++) {
    windows[n].newcolor()
    windows[n].sketch()
    
  }
}

function makeWindows() {
  roof = canvasHeight-boxHeight;
  numrows = round(boxHeight / 45);
  
  middle = canvasWidth/2;
  
  for(var i=1; i<=numrows; i++){
    inc = -60;
    for(var j=0; j<4; j++) {
      windows.push(new square(middle+inc, canvasHeight-(i*40), 40))
      inc += 40
    }
  }
}


function square(x,y,width) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.clr = color(round(random(255)),round(random(255)),round(random(255)))
  
  this.sketch = function() {
    fill(this.clr)
    rect(this.x,this.y,this.width,this.width,4,4,4,4)
  }
  
  this.newcolor = function() {
      this.clr = color(round(random(255)),round(random(255)),round(random(255)))
  }
}