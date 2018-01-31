var w = 1200;
var volSlider1;

var filter1;

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Circle variables for knob
var x = 160;
var y = 180;
var r = 40;

// Knob angle
var angle = 0;

var count = 0;

// Offset angle for turning knob
var offsetAngle = 0;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('davie.mp3');
  mySound2 = loadSound('planes.mp3');
}

function setup() {
  rectMode(CENTER); 
  createCanvas(w,600); 
  
  mySound.play();
  mySound2.play();
  volSlider1 = new SimpleSlider((w/2)-60,450,120,70,'#A3C4BC');
  
  filter1 = new p5.LowPass();

  // Disconnect soundfile from master output.
  // Then, connect it to the filter, so that we only hear the filtered sound
  mySound2.disconnect();
  mySound2.connect(filter1);
}

function draw() {
  background(255);
  //console.log(volSlider1.value);
  scaledVol1 = map(volSlider1.value,2.55,255,0.0,.99);
  scaledVol2 = map(volSlider1.value,2.55,255,.99,0.0);
  mySound.setVolume(scaledVol1);
  mySound2.setVolume(scaledVol2);
  fill(100,200,250);
  stroke(51);
  rect(w/2,300,300,400)
  volSlider1.display();
  
  if (count === 0) {
		
  // Is it being dragged?
  if (dragging) {
    var dx = mouseX - x;
    var dy = mouseY - y;
    var mouseAngle = atan2(dy, dx);
    angle = mouseAngle - offsetAngle;
  }

  // Fill according to state
  if (dragging) {
    fill (175);
  } 
  else {
    fill(255);
  }
  // Draw ellipse for knob
  push();
  translate(x, y);
  rotate(angle);
  ellipse(0, 0, r*2, r*2);
  line(0, 0, r, 0);
  pop();
  fill(0);


  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  // Our angle is either between
  var calcAngle = 0; 
  if (angle < 0) {
    calcAngle = map(angle, -PI, 0, PI, 0);
  } 
  else if (angle > 0) {
    calcAngle = map(angle, 0, PI, TWO_PI, PI);
  }

  textAlign(CENTER);
  text(int(degrees(calcAngle)), x, y+r+20);

	var degree = int(degrees(calcAngle));

	if (dragging && degree < 10) {
		count == 2;
	}
	}
	if (count == 0) {
		var b = map(calcAngle, 0, TWO_PI, 0, 20000);
	  fill(b);
	  filter1.freq(b);
	  console.log(b)
	}
}

function mousePressed() {
  // Did I click on slider?
  if (dist(mouseX, mouseY, x, y) < r) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    var dx = mouseX - x;
    var dy = mouseY - y;
    offsetAngle = atan2(dy, dx) - angle;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}

function dot(_id, _xctr, _yctr, _width, _index){
  this.id=_id;
  this.xctr=_xctr;
  this.yctr=_yctr;
  this.width=_width;
  this.index=_index;
}