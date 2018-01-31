cw = 1000;
ch = 700;
var p;

function setup() {
  canvas = createCanvas(cw,ch)  
  p = new moveablePlayer(4);
  noStroke();
}

function draw() {
  background(255)
  p.update();
}

function moveablePlayer(speed) {
  this.x = 500;
  this.y = 350;
  this.speed = speed;
  this.width = 50;
  
  this.update = function(){
    /* r = random(round(255));
    g = random(round(255));
    b = random(round(255));
    fill(r,g,b)
    */
    
    r = 10
    g = map(this.x,0,cw,0,255)
    b = map(this.y,0,ch,0,255)
    fill(r,g,b);
    if (keyIsDown(LEFT_ARROW))
      this.x-=speed;

    if (keyIsDown(RIGHT_ARROW))
      this.x+=speed;

    if (keyIsDown(UP_ARROW))
      this.y-=speed;

    if (keyIsDown(DOWN_ARROW))
      this.y+=speed;
    
    ellipse(this.x,this.y,this.width,this.width);
  }
  
}