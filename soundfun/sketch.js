var soundFile;
var delay;
var lastx;


function preload() {
  soundFormats('mp3');
  soundFile = loadSound('assets/acousticguitar.mp3');
}

function setup() {
  createCanvas(1200, 800);
  fill(255, 40, 255);
  delay = new p5.Delay();
  delay.process(soundFile, 1.0, .99, 200);
  soundFile.play();
  lastx = 10;
}

function draw() {
  mappedx = map(mouseX,0.0,1200.0,0.0,1.0);
  if(mappedx != lastx){
    delay.process(soundFile,mappedx,.99);
    lastx = mappedx;
  }
}