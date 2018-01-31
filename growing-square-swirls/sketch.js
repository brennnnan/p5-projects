x1=300;
x2=700;
y1=100;
y2=500;
var counter = 0;
var distance = 0;

function setup() {
  createCanvas(1000,800);
  strokeWeight(4);
  frameRate(5)
}


function draw() {
  clear()
  counter++;
  distance = map(mouseX, 0,800,1,20);
  
  beginShape();
  vertex(x1,y1);
  vertex(x2,y1);
  vertex(x2,y2);
  vertex(x1,y2);
  vertex(x1,y1+20);
  
  for(var i=1; i<counter%50+10; i++) {
    
    vertex(x2-i*20, y1+i*20);
    vertex(x2-i*20, y2-20*i);
    vertex(x1+20*i, y2-20*i);
    vertex(x1+20*i, y1+(i+1)*20);
    
  
  }
  endShape();
}