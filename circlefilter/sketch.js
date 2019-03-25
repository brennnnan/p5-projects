var win_width, win_height;
var circles = []
var x,y,w;
var hit;
var l = 0;
var pressed = 0;
var seq = [1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1]

function setup() {
  createCanvas(800,600);
  win_width = windowWidth;
  win_height = windowHeight;
  generate_circles(50);
  frameRate(15)
}

function draw() {
  background(255);
  //console.log(circles.length)
  line(10, win_height/2, win_width - 10, win_height/2);
  
  for(var y=0; y<circles.length; y++) {
    fill(circles[y].rgb[0],circles[y].rgb[1],circles[y].rgb[2])
    //console.log(circles[y].rgb[0]+' '+circles[y].rgb[1]+' '+circles[y].rgb[2])
    ellipse(circles[y].x, circles[y].y, circles[y].width, circles[y].width)
    shift_circle(y);
    randomfill(y);
  }
}

function generate_circles(numcircles) {
  var i=0;
  var reset = 0;
  while(i<numcircles) {
    //console.log(i)
    //console.log(circles.length+' '+numcircles+' '+i);
    x = round(random(50,win_width-50));
    y = round(random(50,win_height-50));
    w =round(random(10,50));
    if((y > win_height/2-30) && (y<win_height/2+30)) {
      continue;
    }
    l = round(map(y,0,600,0,1));
    if (circles.length === 0) {
      circles.push(new circle(x,y,w,l,round(random(seq.length))))
      i++;
      continue;
    }
    
    for(var j=0; j<circles.length; j++) {
      hit = collideCircleCircle(x,y,w,circles[j].x,circles[j].y,circles[j].width);
      if (hit) {
          reset = 1;
          break;
      }
    }
    
    if (reset || (abs((win_height/2) - (y+w))< 10)){
      reset = 0;
      continue;
    }

    circles.push(new circle(x,y,w,l,round(random(seq.length))));
    i++;
  }
}

function mousePressed() {
  for(var t=0; t<circles.length; t++) {
    hit = collidePointCircle(mouseX, mouseY, circles[t].x,circles[t].y,circles[t].width);
    if (hit) {
      switch_side(t);
    }
  }
}

function shift_circle(l) {
  circles[l].base=(circles[l].base+1)%seq.length;
  circles[l].width = circles[l].width+seq[circles[l].base]
}

function randomfill(d) {
  var amt = 255
  r = round(random(amt))
  g = round(random(amt))
  b = round(random(amt))
  //circles[d].rgb[0] = (circles[d].rgb[0] + r)%255
  circles[d].rgb[1] = (circles[d].rgb[1] + g)%255
  circles[d].rgb[2] = (circles[d].rgb[2] + b)%255
}

function switch_side(k) {
  x = round(random(50,win_width/2-50))
  if(circles[k].location == 1) {
    y = round(random(40,(win_height/2)-30))
  } else {
    y = round(random((win_height/2)+30, win_height-30))
  }
  w = round(random(10,50));
  
  circles[k].x = x;
  circles[k].y = y;
  circles[k].width = w;
}

function circle(_x, _y, _width, _loc, _base) {
  this.x = _x; 
  this.y = _y;
  this.width = _width;
  this.location = _loc;
  this.base = _base;
  this.rgb = [0,0,0]
}