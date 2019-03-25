function preload() {
  mySound = loadSound('./2f.wav')
}
var counter = 0;
function setup() {
  mySound.setVolume(0.1);
  frameRate(10);
}

function draw() {
  counter++
  if(counter%4==0) mySound.play()
}