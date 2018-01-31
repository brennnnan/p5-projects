var bottom= 750;
var lines = [];
var incr = 2;
var switcher = 0;
var rgb = [0,0,0]
var exiter=0;
var mid = 300;
var end = mid*2;
var clickinc = 5
function setup() {
  createCanvas(600,600)
  newgrid()
  drawlines()
}

function draw() {
  
}

function drawlines() {
  background(255);
  for(var h = 0; h<lines.length; h++) {
    stroke(lines[h].r, lines[h].g, lines[h].b);
    line(lines[h].x1, lines[h].y1, lines[h].x2, lines[h].y2);
  }
}

function mouseClicked() {
  if(incr>clickinc) incr -= clickinc;;
  
  newgrid()
  drawlines()
}

function line1(_x1, _y1, _x2, _y2, _red, _green, _blue) {
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
  this.r = _red;
  this.g = _green;
  this.b = _blue;
}


function newgrid() {
  
  console.log('inc: '+incr+'  len: '+lines.length);
  
  lines.length=0;
  
  for(var i=incr; i<mid; i+=incr) {
    a = round(random(2));
    b = round(random(100))
    rgb[a] = (rgb[a]+b)%255;
    lines.push(new line1(i, mid, mid, mid+i, rgb[0], rgb[1], rgb[2]));
    lines.push(new line1(i, mid, mid, mid-i, rgb[0], rgb[1], rgb[2]));
    a = round(random(2));
    b = round(random(100))
    rgb[a] = ((rgb[a]+b)%255);
    lines.push(new line1(end-i, mid, mid, mid-i, rgb[0], rgb[1], rgb[2]));
    lines.push(new line1(end-i, mid, mid, mid+i, rgb[0], rgb[1], rgb[2]));
    //lines.push(new line1(mid, 0, mid, end));
    //lines.push(new line1(0, mid, end, mid));
  }
}