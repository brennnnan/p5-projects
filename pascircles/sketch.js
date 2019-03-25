circles = []
max_width = 800;

rgb = [0,0,0]

function setup() {
  createCanvas(1000, 800);
}

function colourshift() {
  rand = round(random(0,2));
  quantity = round(random(2,200));
  rgb[rand] += quantity;
  if(rgb[rand]>=255) rgb[rand] = 0;
}

function expand(crcle) {
  if(crcle.width < crcle.max_width)
    crcle.width += map(crcle.width, crcle.max_width, 10, 1, 10);
  //if(crcle.width < max_width)
    //crcle.width += 5;
}

function draw() {
  background(255);
  var i;
  for(i=0; i<circles.length; i++) {
    expand(circles[i]);
    fill(circles[i].rgb_)
    
    circles[i].sketch();
  }
}

function mouseClicked() {
  colourshift();
  circles.push(new circle(mouseX, mouseY))
  circles[circles.length-1].rgb_=[rgb[0],rgb[1],rgb[2]]
}

function circle(x, y) {
  this.width = 10;
  this.x = x;
  this.y = y;
  this.rgb_ = [0,0,0];
  this.max_width = max_width;
  max_width -= 5;
  this.sketch = function() {
    noStroke();
    fill(this.rgb_)
    ellipse(this.x, this.y, this.width, this.width);
  }

}