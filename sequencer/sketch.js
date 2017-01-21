dot_array = [];
var dot_count=0;
// array containing width values for swell
var bounce=[];
var total=-1;
var hhc, hho, kck, snr, lt, ht, clp;
var started=0;
var ticker =0;
myPart = new p5.Part();
var bpm = 110;
var bpmLock = 0;

var multiplier=20;
var patterns = new Array(7);

$(function() {
  $(".dial").knob();  
});

//Loads wave files used as samples in sequencer
function preload() {
  hhc = loadSound('assets/closed.wav');
  hho = loadSound('assets/oh01.wav');
  snr = loadSound('assets/snare.wav');
  kck = loadSound('assets/kick.wav');
  lt = loadSound('assets/lt02.wav');
  ht = loadSound('assets/mt02.wav');
  clp = loadSound('assets/cp02.wav');
}


function setup() {
  if(windowWidth > 1300 && windowHeight > 800) createCanvas(windowWidth,windowHeight);
  else if(windowWidth > 1300 && windowHeight <= 800) createCanvas(windowWidth, 800);
  else if(windowWidth <=1300 && windowHeight > 800) createCanvas(1300, windowHeight);
  else createCanvas(1300, 800);
  
  rectMode(CENTER)
  //Fills bounce array with values used to show circles swelling
  loadbounce();
  
  //Initializes pattern arrays to 0 for each sample row
  for (var i=0; i<7; i++){
    patterns[i] = new Array(16);
    for (var j=0; j<16; j++) {
      patterns[i][j]=0;
      dot_array.push(new dot(dot_count,j,i,(j+2)*70,(i+2)*85,2*multiplier,0,false));
      dot_count ++;
    }
  }
  
  fill('rgba(10,100,200,.8');
  makephrases();
}
//Assigns patterns to 'phrases' and creates a part composed of all phrases.
function makephrases(){
  myPhrase1 = new p5.Phrase('hihatc', makeSound, patterns[0]); 
  myPhrase2 = new p5.Phrase('hihato', makeSound2, patterns[1]); 
  myPhrase3 = new p5.Phrase('snare', makeSound3, patterns[2]);
  myPhrase4 = new p5.Phrase('ht', makeSound4, patterns[3]);
  myPhrase5 = new p5.Phrase('lt', makeSound5, patterns[4]);
  myPhrase6 = new p5.Phrase('clap', makeSound6, patterns[5]);
  myPhrase7 = new p5.Phrase('kicker', makeSound7, patterns[6]);
  
  
  myPart.addPhrase(myPhrase1);
  myPart.addPhrase(myPhrase2);
  myPart.addPhrase(myPhrase3);
  myPart.addPhrase(myPhrase4);
  myPart.addPhrase(myPhrase5);
  myPart.addPhrase(myPhrase6);
  myPart.addPhrase(myPhrase7);
  myPart.setBPM(110);
  myPart.onStep(grow); 
}


// only trigger dot swells when step goes past

// right now it misses the swells that come before selection because of comparisons to steps
function grow() {
  if(started==1 && ticker%16===0) started++;
  if(started==2) {
    total = (total+1)%16;
    for(var i=0; i<7; i++) {
      dot_array[total+(i*16)].growing = 1;
    }
  }
}

function loadbounce(){
  //creates an array of ~ like values for 'growing' the steps
  var k=multiplier*2;
  for(var u=1;u<=10;u++){
    bounce.push(k+u);
  } 
  for(var d=1;d<10;d++){
    bounce.push(bounce[10-d]);
  }
}


function draw() {
  background('#8CD6DE');
  newbpm = round(map(mouseX, 0,1400,80,170))
  if (newbpm != bpm && bpmLock == 0) {
    myPart.setBPM(newbpm);
    bpm = newbpm;
  }
  noStroke();
  fill('#948CDE');
  
  for (var c=0;c<dot_count;c++){
    
    // if dot has been clicked draw border
    if(dot_array[c].clicked){
      strokeWeight(6);
      stroke(255,255,255);
    }
    
    // if dot is growing, then grow it according to where it is in array
    if (dot_array[c].growing==1){
      dot_array[c].width = bounce[dot_array[c].index];
      dot_array[c].index++;
      // when dot has swelled and shrunk, stop the cycle
      if(dot_array[c].index==18) {
        dot_array[c].growing=0; 
        dot_array[c].index=1;
      }
    }
    
    dot_array[c].sketch()
    noStroke();
  }
  
  textSize(32);
  fill('rgb(60,130,200)');
  text('bpm: '+bpm, 530, 95);
  stroke(51)
  strokeWeight(1)
  
  
  if(bpmLock == 1) {
    line(520,105,670,105)
    line(520,105,520,60);
    line(670,105,670,60);
    line(520,60,670,60);
  }
  
  /*
  for(var d=0; d<8; d++) {
    stroke(0)
    strokeWeight(1)
    line(120,127+(d*85),windowWidth-200,(0,127+(d*85)))
  }
  
  for(var r=0; r<17; r++) {
    stroke(0)
    strokeWeight(1)
    //line(105+(r*70),40,105+(r*70),800);
  }*/
}

function clearPatterns(){
  // running total keeps track of iterations
  // sets each step in pattern to 0
  var running_total=0;
  started = 0;
  total=-1;
  myPart.stop();
  for (var i=0; i<7; i++){
    for (var j=0; j<16; j++) {
      patterns[i][j]=0;
      dot_array[running_total].clicked=0;
      dot_array[running_total].growing=0;
      running_total++;
    }
  }
}

function makeSound() {
   hho.play();
}
function makeSound2() {
   hhc.play();
}
function makeSound3() {
   snr.play();
}
function makeSound4() {
   ht.play();
}
function makeSound5() {
   lt.play();
}
function makeSound6() {
   clp.play();
}
function makeSound7() {
   kck.play();
}

//When mouse is released, scale volume level of each track according to knobs
function mouseReleased() {
  hho.setVolume(document.getElementById("knob1").value*.1);
  hhc.setVolume(document.getElementById("knob2").value*.1);
  snr.setVolume(document.getElementById("knob3").value*.1);
  ht.setVolume(document.getElementById("knob4").value*.1);
  lt.setVolume(document.getElementById("knob5").value*.1);
  clp.setVolume(document.getElementById("knob6").value*.1);
  kck.setVolume(document.getElementById("knob7").value*.1);
}

function mouseClicked() {
  
  

  if (keyCode == OPTION && keyIsPressed === true) {
    if(bpmLock === 0) bpmLock = 1;
    else bpmLock = 0;
    return;
  }

  // if any of the dots are clicked, changed .clicked value to true or false if they already are 
  for(var f=0; f<dot_count; f++){
    hit = collidePointCircle(mouseX, mouseY, dot_array[f].xctr, dot_array[f].yctr, dot_array[f].width);
    if (hit) {
      if(started === 0){
        myPart.start();
        myPart.loop();
        started++;
      }
      // if clicked, indicate it in pattern
      patterns[dot_array[f].colid][dot_array[f].rowid] = (patterns[dot_array[f].colid][dot_array[f].rowid]+1)%2;
      // if turned on, turn off
      if(dot_array[f].clicked === true){
        dot_array[f].clicked = false;
        return;
      }
      dot_array[f].clicked=true;
    }
  }
  
  
  
  
}

function dot(_id, _rowid, _colid, _xctr, _yctr, _width, _index, _clicked){
  this.id=_id;
  this.rowid=_rowid;
  this.colid=_colid
  this.xctr=_xctr;
  this.yctr=_yctr;
  this.width=_width;
  this.index=_index;
  this.clicked=_clicked;
  this.growing=0;
  
  this.sketch = function() {
    rect(this.xctr,this.yctr,this.width,this.width,10);
  }
}
