var soundFile;
var fft;

var filterFreq, filterRes;
var bass, treble;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/mimi.mp3');
}

function setup() {
  createCanvas(1200, 400);
  fill(255, 40, 255);

  // loop the sound file
  soundFile.play();
  fft = new p5.FFT();
  bass = new inst(0,0,600,300,0,0);
  treble = new inst(0,0,600,100,0,1);
}

function draw() {
  fill(255);
  background(255);
  var spectrum = fft.analyze(); 
  bass.energy = fft.getEnergy('bass');
  if(bass.energy>250){
    bass.start = 1;
  }
  treble.energy = fft.getEnergy('treble');
  
  if (bass.energy>150 && ((millis() - bass.last)>100)){
    bass.dir=(bass.dir+2)%2
    bass.last = millis();
  }
  //console.log((millis()-treble.last))
  if (treble.energy>100 && ((millis() - treble.last)>100)){
    //console.log(treble.energy);
    treble.dir=(treble.dir+1)%2;
    treble.last = millis();
  }
  if(treble.dir==0){
    line(600,100,treble.x+2,treble.y)
    treble.x+=2;
  } else if(treble.dir==1){
    line(600,100,treble.x-2,treble.y)
    treble.x-=2;
  }
  if (bass.start==1){
    if(bass.dir==0){
      line(600,300,bass.x+1,bass.y)
      bass.x+=1;
    } else if(treble.dir==1){
      line(600,300,treble.x-1,bass.y)
      bass.x-=1;
    }
  }
  
}

function inst(_energy, _dir, _x, _y, _last, _start) {
  this.energy = _energy;
  this.dir = _dir;
  this.x = _x;
  this.y = _y;
  this.last = _last;
  this.start = _start;
}