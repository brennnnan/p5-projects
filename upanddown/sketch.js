swell = [];
swell2 = []
lines = [];
numLines = 25.0;
counter = 0;
megacounter = 0;

function setup() {
  canvas = createCanvas(1000,800)
  fillSwell();
  makeLines();
}



function fillSwell() {
  
  var a = 0.0;
  var inc = TWO_PI/numLines;
  for(var i=0; i<numLines; i++) {
    swell.push(sin(a))
    a = a + inc;
  }
}

function makeLines() {
  relwidth = width - 200;
  for(var i=0; i<numLines; i++) {
    lines.push(new lineObject((relwidth/numLines)*i+100,300+(50*swell[i])))
    counter ++;
  }
}

function draw() {
  background(250)
  for(var i=0; i<lines.length; i++) {
    lines[i].sketch();
    lines[i].move();
  }
}

function lineObject(_x,_y) {
  this.x = _x;
  this.y = _y;
  this.id = counter;
  this.mul = 20
  
  
  
  
  this.sketch = function() {
    strokeWeight(10)
    line(this.x,this.y,this.x,this.y+(swell[megacounter%swell.length])*50)
  }
  
  this.move = function() {
    
    //grower
    megacounter ++;
    //if(megacounter%62==0) this.mul ++;
    //if(megacounter%44==0) this.mul ++;
    this.y = 300+(this.mul*swell[(this.id++)%swell.length])
  }
  
}