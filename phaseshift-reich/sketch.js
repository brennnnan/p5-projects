var reverb;
var fft, bandfilter;
circles = [];

function preload() {
  leftLoop = loadSound('assets/howgentle1.mp3')
  rightLoop = loadSound('assets/howgentle2.mp3')
  
}

function setup() {
  rectMode(CENTER);
  frameRate(20)
  reverb = new p5.Reverb();
  bandfilter = new p5.LowPass();
  leftLoop.disconnect()
  rightLoop.disconnect()
  reverb.process(leftLoop, 9,2)
  reverb.process(rightLoop, 9,2)
  canvas = createCanvas(1000,800)
  leftLoop.pan(-.9)
  rightLoop.pan(.9)
  leftLoop.connect(bandfilter)
  rightLoop.connect(bandfilter)
  
  
  leftLoop.loop(0,1,1,15.4,2.8)
  rightLoop.loop(0,2,1,15.4,2.8)
  fft = new p5.FFT();
  
  circles.push(new dot(300,400,10))
  circles.push(new dot(700,400,10))
  
}

function draw() {
  
  background(map(mouseX,0,1000,0,255),map(mouseX+80,0,1000,0,255),map(mouseY,0,800,0,255));
  circles[0].width = map(leftLoop.currentTime(),15.4,18.2,10,200)
  circles[1].width = map(rightLoop.currentTime(),15.4,18.2,10,200)
  //console.log(rightLoop.currentTime())
  circles[1] = rightLoop.currentTime()*4
  var freq = map(mouseX, 0, width, 20, 10000);
  bandfilter.freq(freq);
  // give the filter a narrow band (lower res = wider bandpass)
  bandfilter.res(5);
  
  //circles[0].sketch()
  //circles[1].sketch()
}

function dot(_x,_y,_width) {
	this.x = _x;
	this.y = _y;
	this.width = _width;

	this.sketch = function() {
		ellipse(this.x,this.y,this.width,this.width)
	}
}

function square(_x,_y,_width) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  
  this.sketch = function() {
    rect(this.x,this.y,this.width)
  }
}