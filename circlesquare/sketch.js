circles = [];
var p1,p2,p3,p4;
var cwid = 40
vecs = [];

function setup() {
  createCanvas(300,300);
  makeCircles();
  
}

function draw() {
  background(255)
  
  for(var i=0; i<circles.length; i++){
    circles[i].trace();
    circles[i].movealong();
  }
}

function mouseClicked() {
  for(var g=0; g<circles.length; g++) {
    hit = collidePointCircle(mouseX,mouseY,circles[g].x,circles[g].y,circles[g].width);
    if (hit) {
      circles[g].osc = new p5.Oscillator(circles[g].oscfreq,'sine');
      circles[g].osc.amp(.5,.2);
      circles[g].osc.start();
    }
  }
}

function circle(_x,_y,_w,_id,_rgb,ofreq){
  this.x = _x;
  this.y = _y;
  this.width = _w;
  this.id = _id;
  this.rgb = _rgb;
  this.osc = 0;
  this.oscfreq = ofreq;
  
  
  this.trace = function() {
    fill(51);
    ellipse(this.x,this.y,round(this.width),round(this.width));
  }
  
  this.movealong = function() {
    if(this.id == 0) this.x ++;
    else if(this.id == 1) this.y ++;
    else if(this.id == 2) this.x --;
    else if(this.id == 3) this.y --;
    n = 300-this.y;
    if(this.osc) this.osc.amp(map(n,70,230,0.3,1.0));
    for(var f=0;f<vecs.length;f++){
      hit = collidePointPoint(vecs[f].x,vecs[f].y,this.x,this.y);
      if (hit) {
        this.id = f;
      }
    }
  }
  
}

function makeCircles() {
  p1 = createVector(70,70);
  vecs.push(p1)
  p2 = createVector(230,70);
  vecs.push(p2)
  p3 = createVector(230,230);
  vecs.push(p3)
  p4 = createVector(70,230);
  vecs.push(p4)
  
  circles.push(new circle(p1.x,p1.y,cwid,0,[30,30,30],175));
  circles.push(new circle(p2.x,p2.y,cwid,1,[30,30,30],220));
  circles.push(new circle(p3.x,p3.y,cwid,2,[30,30,30],262));
  circles.push(new circle(p4.x,p4.y,cwid,3,[30,30,30],330));
}
