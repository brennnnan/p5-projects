
var bottom= 750;
var lines = [];
var inc = 140;
var switcher = 0;
var rgb = [0,0,0]
var exiter=0;

function setup() {
  frameRate(10);
  createCanvas(800,800);
}

function draw() {
  if(exiter){
    inc=2;
    newgrid();
    drawlines();
    return;
  }
  if(inc==2){
    exiter=1;
  }
  drawlines();
  newgrid();
  if(inc>1 && inc<150){
    if(inc > 146){
      switcher = 1;
    }
    if(inc < 5){
      switcher = 0;
    }
    if(switcher===0){
      inc += 2
    }
    else{
      inc -= 2;
    }
  }
}

function drawlines() {
  background(255);
  for(var h = 0; h<lines.length; h++) {
    stroke(lines[h].r, lines[h].g, lines[h].b);
    line(lines[h].x1, lines[h].y1, lines[h].x2, lines[h].y2);
  }
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
  console.log('inc: '+inc+'  len: '+lines.length);
  
  lines.length=0;
  
  for(var i=inc; i<200; i+=inc) {
    a = round(random(2));
    b = round(random(100))
    rgb[a] = (rgb[a]+b)%255;
    lines.push(new line1(i, 400, 400, 400+i, rgb[0], rgb[1], rgb[2]));
    lines.push(new line1(i, 400, 400, 400-i, rgb[0], rgb[1], rgb[2]));
    a = round(random(2));
    b = round(random(100))
    rgb[a] = ((rgb[a]+b)%255);
    lines.push(new line1(800-i, 400, 400, 400-i, rgb[0], rgb[1], rgb[2]));
    lines.push(new line1(800-i, 400, 400, 400+i, rgb[0], rgb[1], rgb[2]));
    lines.push(new line1(400, 0, 400, 800));
    lines.push(new line1(0, 400, 800, 400));
  }
}