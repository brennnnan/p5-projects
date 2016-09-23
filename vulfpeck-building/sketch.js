var start, end;
start = 700
var n = 15;

function setup() {
  createCanvas(1200, 800);
}

function draw() {
  background('rgb(200,40,40)');
  var i;
  strokeWeight(1);
  start = 700;
  for(i=0;i<10;i++){
    line(100,start,800,start-(i*n));
    line(800,start-(i*n),1100,start)
    start-=50
  }
}