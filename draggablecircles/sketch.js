var shapes = [];
var grid = [];
var count;

var current = 0;
var offsetx = 0;
var offsety = 0;
var act = -1;


function setup() {
  createCanvas(1200, 800);
  shapes.push(new button_obj(0, 100, 100, 300, 300, 0, 0));
  for(var i = 0; i<10; i++){
    for(var ii=0; ii<10; ii++) {
      grid.push(new button_obj(0,10,10,60+(ii*100), 60+(i*70), 0, 0));
    }
  }
}

function draw() {
  background(255);
  if(mouseIsPressed){
    if(act >=0){
      shapes[act].x = mouseX - offsetx;
      shapes[act].y = mouseY - offsety;
    }
  }
  for(var i=0; i<shapes.length; i++) {
    fill('rgba(20,150,80,.4)');
    ellipse(shapes[i].x,shapes[i].y, shapes[i].width, shapes[i].width);
  }
  for(var h=0; h<grid.length; h++) {
    fill(51);
    if(grid[h].active) {
      if (grid[h].width<30) {
        grid[h].width++;
      }
      else if(grid[h].width>29) {
        grid[h].width --;
      } else if(grid[h].width == 10){
        grid[h].active = 0;
      }
    }
    ellipse(grid[h].x,grid[h].y,grid[h].width,grid[h].width);
  }
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

function mousePressed() {
  for(var n=0; n<shapes.length; n++){
    hit = collidePointCircle(mouseX, mouseY, shapes[n].x, shapes[n].y, shapes[n].width)
    if (hit) {
      shapes[n].active = 1;
      offsetx = mouseX - shapes[n].x;
      offsety = mouseY - shapes[n].y;
      act = n;
    }
  }
  
}

function mouseReleased(){
  
  for(var n=0; n<grid.length; n++){
    if(act>=0){
      hit = collideCircleCircle(grid[n].x, grid[n].y, 10, shapes[act].x, shapes[act].y, shapes[act].width)
      if (hit) {
        grid[n].active = 1;
      }
    }
  }
  act = -1;
}