lines = []
counter = 0;
var fft;
var spectrum;

function preload() {
  sound = loadSound('dance.mp3');
  //frameRate(0)
}

function setup() {
  canvas = createCanvas(1000,800);
  canvas.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.6);
  //mic = new p5.AudioIn();
  //mic.start();
  fft.setInput(sound);
}




function draw() {
   background(0);
  
  spectrum = fft.analyze(); 
  //noStroke();
  kick = fft.getEnergy(50,120)
  hat = fft.getEnergy(2000,8000)
  snr = fft.getEnergy(400,500)
  fill(200,200,200)
  r = round(random(255));
  g= round(random(255));
  b = round(random(255));
  if(kick > 230) fill(r,g,b)
  ellipse(700,200,kick,kick)
  fill(255)
  ellipse(400,600,hat,hat)
  ellipse(500,400,snr,snr)
  
  text('click to play/pause', 4, 10);
}


function lineobject(x1_,y1_,x2_,y2_) {
  this.x1 = x1_;
  this.y1 = y1_;
  this.x2 = x2_;
  this.y2 = y2_;
  
  this.sketch = function() {
    strokeWeight(10)
    line(this.x1,this.y1,this.x2,this.y2) 
  }
} 

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function rangeObject(x_,y_,lower_,upper_) {
  this.x = x_;
  this.y = y_;
  this.lower = lower_;
  this.upper = upper_;
  this.width = 1;
  this.r = 255;
  this.g = 255;
  this.b = 255;
  
  this.randomFill = function() {
    c = random(round(255));
    r = c;
    c = random(round(255));
    g = c;
    c = random(round(255));
    b = c;
  }
  
  this.check = function() {
  }
  
  this.sketch = function() {
    fill
    ellipse(this.x,this.y,this.width,this.width)
  }
}
  