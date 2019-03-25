var circles = [];
var beginning;
var current;
var growing = 1;
colors = [0,0,0];
var chosen = 0;
var speed = 1;
var up = [1,1,1];
var out =0;
var mid = 400;

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  noFill()
  background(255);
  strokeWeight(2);
  rectMode(CENTER);
  ellipse(400,400,700,700);
  var counter = 0;
  for (var i = 700; i > 100; i=(i*.8)) {
    i = round(i);
    circles.push(new circle(counter, i, 0, 0, 0));
    counter++;
  }
  
  current = circles.length-2;
  
  
}

function draw() {
  if (out==1) return;
  if (growing){
    if (circles[current].id > 0) {
      
      if(circles[current].width+1 < circles[current-1].width) {
        
        circles[current].width += (speed*(noise(circles[current].width)*2));
        changecolor();
        
      } else {
        current --; 
        //speed++;
        chosen=(chosen+1)%3;
      }
    } else growing = 0;
  } 
  
  else {
    if (circles[current].id < circles.length-1) {
      if (circles[current].width > circles[current+1].width){
        
        circles[current].width-= (speed*(noise(circles[current].width)*2));
        changecolor();
        
      } else {
        current++;
        //speed++;
        chosen = (chosen+1)%3;
      }
    } else growing = 1;
  }
  round(colors[chosen]);
  background(255);
  
  //set correct color
  circles[current].r = colors[0], circles[current].g = colors[1], circles[current].b = colors[2];  
  
  for (var y = 1; y < circles.length-1; y++){
    stroke(circles[y].r, circles[y].g, circles[y].b);
    //if (y==current){
    //  stroke
    //}
    rect(mid, mid, circles[0].width, circles[0].width);
    ellipse(mid, mid, circles[y].width, circles[y].width);
    rect(circles[y].width,circles[y].width,circles[y].width,circles[y].width);
    
 
  }
  
}

function changecolor() {
  if (up[chosen] == 1) {
    colors[chosen] ++;
  } else colors[chosen] --;
  if (colors[chosen] == 255) {
    up[chosen] = 0;
  } 
  if (colors[chosen] == 0) {
    up[chosen] = 1;
  }
}

function mouseClicked(){
  out += 1;
  out = out%2;
  console.log(out);
}

function circle(_id, _width, _r, _g, _b){
  this.id = _id;
  this.width = _width;
  this.r = _r;
  this.g = _g;
  this.b = _b
}

function square(_ul, _ur, _br, _bl) {
  this.ur = _ur;
  this.ul = _ul;
  this.br = _br;
  this.bl = _bl;
}