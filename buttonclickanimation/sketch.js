var shapes = [];
var count;
var current = 0;
var plop1, plop2;

function preload() {
  plop1 = loadSound('plop1.wav');
  plop2 = loadSound('plop2.wav');
}

function setup() {
  createCanvas(1200, 800);
  shapes.push(new button_obj(0, 90, 90, 300, 300, 0, 0));
}

function draw() {
  //background(255);
  clear()
  for(var i=0; i<shapes.length; i++) {
    fill('rbga(20,150,80,200)');
    ellipse(shapes[i].x,shapes[i].y, shapes[i].width, shapes[i].width);
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
  count=0;
  for(var n=0; n<shapes.length; n++){
    hit = collidePointCircle(mouseX, mouseY, shapes[n].x, shapes[n].y, shapes[n].width)
    if (hit) {
      count ++;
      shapes[n].width -= 15;
      current = n;
      plop1.play()
    }
  }
  if (count==0){
      shapes.push(new button_obj(0,90,90,mouseX,mouseY,0,0));
      current = -1;
    }
  
}

function mouseReleased(){
  if(current >= 0){
    shapes[current].width += 15;
    plop2.play()
  }
  current = -1;
}