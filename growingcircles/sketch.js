circles = []

function setup() {
  createCanvas(1000,800);
}

function draw() {
  background(255)
  for(var i=0; i<circles.length; i++) {
    if(circles[i].width > 800) {
      circles.splice(i,1);
    } else {
      circles[i].colorshift();
      circles[i].sketch();
      circles[i].width+=1;
    }
  }
}

function circle(_x,_y) {
  this.x = _x;
  this.y = _y;
  this.width = 10;
  this.rgb = [0,0,0]
  
  this.sketch = function(){
    fill(this.rgb)
    noStroke()
    ellipse(this.x, this.y, this.width, this.width);
  }
  this.colorshift = function(){
    rand = round(random(0,2));
    quantity = round(random(2,8));
    this.rgb[rand]+=quantity;
    if(this.rgb[rand]>=255) this.rgb[rand] =0;
  }
}

function mouseClicked() {
   circles.push(new circle(mouseX,mouseY))
}