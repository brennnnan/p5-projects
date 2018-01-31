var thing;
var osc;
var env;
var startTime;

function setup() {
  createCanvas(1200,800)  
  thing = new envelope(200,200);
  osc = new p5.TriOsc(); 
  osc.freq(440);
  env = new p5.Env();
  osc.freq(env)
  osc.amp(1)
  //osc.start()
}

function draw() {
  clear()
  thing.sketch()
}

function keyPressed() {
  playSound();
}

function playSound() {
  attackLevel = map(thing.circlePoints[0].position.y,thing.y+100, thing.y, 0.0, 1000.0)
  attackTime = map(thing.circlePoints[0].position.x, thing.x, thing.x+200,0.0,10);
  decayTime = map(thing.circlePoints[1].position.x, thing.x, thing.x+200,0.0,10)-attackTime;
  susratio = .5;
  releaseTime = 2;
  env.setADSR(attackTime,decayTime,susratio,releaseTime)
  env.setRange(attackLevel, 1);
  console.log('attack: '+attackLevel)
  console.log('attack time: '+attackTime)
  console.log('decayTime: '+decayTime)
  startTime = millis()
  env.play()
}

function envelope(_x,_y) {
  this.x = _x;
  this.y = _y;
  this.enclosure = new rectShape(this.x, this.y, 200,100);
  this.circlePoints = []

  this.circlePoints.push(new draggableCircle(this.x+70, this.y+20, 8, 0))
  this.circlePoints.push(new draggableCircle(this.x+120, this.y+50, 8, 1))
  this.circlePoints.push(new draggableCircle(this.x+160, this.y+50, 8, 2))
  this.circlePoints.push(new draggableCircle(this.x+200, this.y+96, 8, 3))
  
  this.sketch = function() {
    this.enclosure.sketch()
    fill('#8AC4FF');
    
    beginShape()
    vertex(this.x,this.y+100);
    vertex(this.circlePoints[0].position.x, this.circlePoints[0].position.y)
    vertex(this.circlePoints[1].position.x, this.circlePoints[1].position.y)
    vertex(this.circlePoints[2].position.x, this.circlePoints[2].position.y)
    vertex(this.circlePoints[3].position.x, this.circlePoints[3].position.y+4)
    vertex(this.x,this.y+100);
    endShape()
    
    
    for(var i=0; i<this.circlePoints.length; i++) {
      this.circlePoints[i].display()
    }
    
    nowTime = millis() - startTime;
    line(map(nowTime,0,10000,200,400),300,map(nowTime,0,10000,200,400),200)
    
    
  }
  
}

function rectShape(_x, _y, _w, _h) {
  this.x = _x;
  this.y = _y;
  this.width = _w;
  this.height = _h;
  
  this.sketch = function() {
    fill('#3E517A');
    rect(this.x, this.y, this.width, this.height);
  }
}


function draggableCircle(x_,y_,w_,id_) {
  this.position = createVector(x_,y_);
  this.width = w_;
  this.id = id_;
  this.active = 0;
  var offsetx = 0;
  var offsety = 0;
  var startOfClick = 1;
  
  
  this.update = function() {
    if(mouseIsPressed && this.active === 0 && startOfClick === 1) {
      startOfClick = 0;
      hit = collidePointCircle(mouseX, mouseY, this.position.x, this.position.y, this.width)
      if (hit) {
        this.active = 1;
        offsetx = mouseX - this.position.x;
        offsety = mouseY - this.position.y;
      }
    } else if(mouseIsPressed && this.active == 1 && mouseX - offsetx > thing.x && mouseX - offsetx < thing.x+300 && mouseY - offsety > thing.y && mouseY - offsety < thing.y+200) {
      this.position.x = mouseX - offsetx;
      if(this.id != 3) {
        this.position.y = mouseY - offsety;
      }
    } else if(mouseIsPressed) {
      startOfClick = 0;
    } else {
      this.active = 0;
      startOfClick = 1
    } 
  }
  

  this.display = function() {
    this.update();
    stroke(51);
    fill(250);
    ellipse(this.position.x,this.position.y,this.width,this.width); 
  } 
}
