var a,b,c,d;
a = [30,30]
var n = 800;

function preload() {
  sound = loadSound('assets/pol3.mp3');
}

function setup() {
  fft = new p5.FFT();
  createCanvas(1400,800)
  amp1 = new p5.Amplitude();
  sound.play();
}

function draw() {
  var spectrum = fft.analyze();
  var m = fft.getEnergy(300,1200);
  background(51);
  ellipse(400,400,m,m);
  if (m > 120) {
    drawline();
  }
}


function drawline() {
  stroke(255)
  console.log('hapnd');
    line(a[0],a[1],a[0]+n,a[1])
    n --;
    a[0] = a[0]+ n;
    a[1] = a[1]+n;
    
}