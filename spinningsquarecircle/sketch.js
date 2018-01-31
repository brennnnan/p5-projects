up = 1;
t = 0;
counter = 0
bigcount = 0
intervals = []
shapesize = 100;
var song, songfilter;

function preload() {
  song = loadSound('grooves.mp3');
}

function setup() {
  createCanvas(800, 800);
  //frameRate(10)
  
  for(var i=0; i<5000; i++) {
    intervals.push(i*.03)
  }
  
  for(var i=50; i>0; i--) {
    //intervals.push(i*.02)
  }
  songfilter = new p5.HighPass;
  song.connect(songfilter);
  //song.play();

}

function draw() {
  bigcount++;
  var freq = map(t, -5, 1, 18000, 20);
  songfilter.freq(freq);
  
  
  translate(width/2, height/2);
  //rotate(counter);
  counter+=.01;
  background(204);
  if(up==0) {
    t=t-.03;
    if(t<=-5) {up=1;
    t = -5;
    }
  }
  
  if(up==1) {
    t+=.03;
    if(t>1) {
      t = 1;
      up=0;
    }
  }
  
  
  curveTightness(t);
  fill(40,100,180)
  beginShape();
  curveVertex(-(shapesize), shapesize);
  curveVertex(-(shapesize), -(shapesize));
  curveVertex(shapesize, -(shapesize));
  curveVertex(shapesize, shapesize);
  curveVertex(-(shapesize), shapesize);
  curveVertex(-(shapesize), -(shapesize));
  curveVertex(shapesize, -(shapesize));
  endShape();
  
  
  rotate(intervals[bigcount%intervals.length])
  fill(40,140,190)
  beginShape();
  curveVertex(-(shapesize-25), shapesize-25);
  curveVertex(-(shapesize-25), -(shapesize-25));
  curveVertex(shapesize-25, -(shapesize-25));
  curveVertex(shapesize-25, shapesize-25);
  curveVertex(-(shapesize-25), shapesize-25);
  curveVertex(-(shapesize-25), -(shapesize-25));
  curveVertex(shapesize-25, -(shapesize-25));
  endShape();
  
  
 
  rotate(-intervals[bigcount%intervals.length])
  fill(40,150,220)
  beginShape();
  curveVertex(-(shapesize-50), shapesize-50);
  curveVertex(-(shapesize-50), -(shapesize-50));
  curveVertex(shapesize-50, -(shapesize-50));
  curveVertex(shapesize-50, shapesize-50);
  curveVertex(-(shapesize-50), shapesize-50);
  curveVertex(-(shapesize-50), -(shapesize-50));
  curveVertex(shapesize-50, -(shapesize-50));
  endShape();
  
  line(0,-400,0,400);
  line(-400,0,400,0);
  
  line(-400,-400,400,400)
  line(-400,400,400,-400)
  
  rotate(2*intervals[bigcount%intervals.length])
  fill(70,220,220)
  beginShape();
  curveVertex(-(shapesize-75), shapesize-75);
  curveVertex(-(shapesize-75), -(shapesize-75));
  curveVertex(shapesize-75, -(shapesize-75));
  curveVertex(shapesize-75, shapesize-75);
  curveVertex(-(shapesize-75), shapesize-75);
  curveVertex(-(shapesize-75), -(shapesize-75));
  curveVertex(shapesize-75, -(shapesize-75));
  endShape();
  



}