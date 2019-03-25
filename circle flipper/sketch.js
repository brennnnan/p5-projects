var cw = 600;
var ch = 800;
var buffer=30;
var upper = 0;
var vbuffer = 130;

var pointA = [buffer, vbuffer];
var pointB = [cw-buffer, vbuffer];
var pointC = [cw-buffer, ch-vbuffer];
var pointD = [buffer, ch-vbuffer];

function setup() {
  createCanvas(cw,ch);
  stroke(51,200,170);
  frameRate(4)
  strokeWeight(2);
  firstSquare();
}

function firstSquare() {
  line(buffer, vbuffer, cw-buffer, vbuffer);
  line(cw-buffer, vbuffer, cw-buffer, ch-vbuffer);
  line(cw-buffer, ch-vbuffer, buffer, ch-vbuffer);
  line(buffer, ch-vbuffer, buffer, vbuffer);
}
function draw() {
  drawLine()
  upper++;
}

function drawLine() {
  line(pointA[0], pointA[1], pointB[0], pointB[1]);
  line(pointB[0], pointB[1], pointC[0], pointC[1]);
  line(pointC[0], pointC[1], pointD[0], pointD[1]);
  line(pointD[0], pointD[1], pointA[0], pointA[1]);
  
  pointA[0] += 20;
  pointA[1] += upper*1.2;
  pointB[1] += 20;
  pointB[0] -= upper*1.2;
  pointC[0] -= 20;
  pointC[1] -= upper*1.2;
  pointD[1] -= 20;
  pointD[0] += upper*1.2;
}
