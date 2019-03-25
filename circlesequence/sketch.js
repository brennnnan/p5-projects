dotarray = [];

da = [];
var counter=0;
var n=0;
var bounce=[];
var total=-1;
var hhc, hho, kck, snr;
var sw=0;
var cwidth=600;

var mul=20;
var patterns = new Array(12);



function preload() {
  //hhc = loadSound('assets/closed.wav');

}




function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  background(255);
  strokeWeight(3)
  stroke(51);
  
  loadbounce();
  
  
  patterns.push(new dot(0,windowWidth/2,100,50,0,0));
  patterns.push(new dot(1,windowWidth/2,100,50,0,0));
  patterns.push(new dot(0,windowWidth/2,100,50,0,0));
  
  
  
  fill('rgba(10,100,200,.8');
  
  
  

}

function makephrases(bp){
  myPhrase1 = new p5.Phrase('hihatc', makeSound, patterns[0]); 
  myPhrase2 = new p5.Phrase('hihato', makeSound2, patterns[1]); 
  myPhrase3 = new p5.Phrase('snare', makeSound3, patterns[2]);
  myPhrase4 = new p5.Phrase('ht', makeSound4, patterns[3]);
  myPhrase5 = new p5.Phrase('lt', makeSound5, patterns[4]);
  myPhrase6 = new p5.Phrase('clap', makeSound6, patterns[5]);
  myPhrase7 = new p5.Phrase('kicker', makeSound7, patterns[6]);
  
  myPart = new p5.Part();
  myPart.addPhrase(myPhrase1);
  myPart.addPhrase(myPhrase2);
  myPart.addPhrase(myPhrase3);
  myPart.addPhrase(myPhrase4);
  myPart.addPhrase(myPhrase5);
  myPart.addPhrase(myPhrase6);
  myPart.addPhrase(myPhrase7);
  myPart.setBPM(bp);
  myPart.onStep(grow); 
  //delay = new p5.Delay();
  //reverb = new p5.Reverb();
  //delay.process(hhc, .12, .8, 2300);
  //reverb.process(snr, 3, 2);

}

function grow() {
  total = (total+1)%16;
  da[total].growing = 1;
  da[total+16].growing = 1;
  da[total+32].growing = 1;
  da[total+48].growing = 1;
  da[total+64].growing = 1;
  da[total+80].growing = 1;
  da[total+96].growing = 1;
  
}

function loadbounce(){
  var k=mul*2;
  for(var u=1;u<=10;u++){
    bounce.push(k+u);
  } 
  for(var d=1;d<10;d++){
    bounce.push(bounce[10-d]);
  }
}

function draw() {
  background('rgba(64,224,208,1)');
  //fill('rgb(173,255,204)');
  noFill();
  ellipse(400,400,600,600);
  ellipse(400,100,40,40);
  ellipse(400,700,40,40);
  ellipse(700,400,40,40);
  ellipse(100,400,40,40);
  //ellipse(400+((2/3)*cwidth/2),400-(1/3)*(cwidth/2),40,40);
  for (var c=0;c<counter;c++){
    
    if(da[c].clicked){
      strokeWeight(6);
      stroke('rgb(255,255,255');
    }
    if (da[c].growing==1){
      da[c].width = bounce[da[c].index];
      da[c].index++;
      if(da[c].index==18) {
        da[c].growing=0; 
        da[c].index=1;
      }
    }
    ellipse(da[c].xctr,da[c].yctr,da[c].width,da[c].width);
    noStroke();
  }
  
}

function makeSound() {
   hho.play();
}

function mouseClicked() {
 
  
  for(var f=0; f<counter; f++){
    
    hit = collidePointCircle(mouseX, mouseY, da[f].xctr, da[f].yctr, da[f].width);

    if (hit) {
      patterns[da[f].colid][da[f].rowid] = (patterns[da[f].colid][da[f].rowid]+1)%2;
      if(da[f].clicked==true){
        da[f].clicked=false;
        return;
      }
      da[f].clicked=true;

    }
  }
  
}

function dot(_id, _xctr, _yctr, _width, _index, _clicked){
  this.id=_id;
  this.xctr=_xctr;
  this.yctr=_yctr;
  this.width=_width;
  this.index=_index;
  this.clicked=_clicked;
  this.growing=0;
}