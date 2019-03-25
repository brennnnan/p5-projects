cwidth = 800
center = cwidth/2
boxes = [];
circlePoints = []
var m =61;
clicked = 0;
var cc = 2;
var j = 22;
var k = 23;



function setup() {
  rectMode(CENTER);
  createCanvas(cwidth,cwidth)
 
  //makeBoxes();
  var incr = TWO_PI/m;
  
  

  for(var v=1; v<m; v++) {
    x_ = round(center + (150 * cos(v*incr)))
    y_ = round(center + (150 * sin(v*incr)));
    circlePoints.push(new dot(x_,y_));
  }
}

function mouseClicked() {
  if(clicked===0) clicked = 1;
  else {
    clicked = 0;
  }
}

function draw() {
  
  background(240,242,242)
  for(var d=0; d<boxes.length;d++) {
    boxes[d].sketch();
  }
  noFill()
  ellipse(center,center,300,300)
  
  for(var c=0; c<circlePoints.length; c++) {
    ellipse(circlePoints[c].x, circlePoints[c].y,cc,cc)
  }
  
  for(var g=0; g<circlePoints.length; g++) {
    line(circlePoints[j].x,circlePoints[j].y,circlePoints[k].x,circlePoints[k].y);
    //console.log(circlePoints[j].x+" "+circlePoints[j].y+" "+circlePoints[k].x+" "+circlePoints[k].y)
    j--;
    j = (j%(m-1));
    if(j==-1) j=59;
    k++;
    k = (k%(m-1));
  }
  
  if(clicked == 1) {
    cc++
  }
  
}


function makeBoxes() {
  start = center - (cwidth/6)
  for(var i=start; i<cwidth-200; i+=(cwidth/6)) {
    for(var f=start; f<cwidth-200; f+=(cwidth/6)) {
      boxes.push(new boxx(i,f))
    }
  }
}

function boxx(_x,_y) {
  this.x = _x;
  this.y = _y;
  this.width = cwidth/6;
  
  this.sketch = function() {
    rect(this.x,this.y,this.width,this.width)
  }
}

function dot(_x,_y) {
  this.x = _x;
  this.y = _y;
}
