triangles = [];
echoes = []
middle = 0;
counter = 0;
function setup() {
  //frameRate()
  middle = windowWidth/2;
  midheight = windowHeight/2
  canvas = createCanvas(windowWidth,windowHeight);
  triangles.push(new triangle_object(middle - 100,midheight-100,middle+100,midheight-100,middle,midheight+73));
}

function draw() {
  background(30);
  counter++
  for(var i=0; i<triangles.length; i++) {
    triangles[i].sketch();
    if(triangles[i].x1>600) {
    	triangles[i].grow();
    }
    triangles[i].redshift();
    if(counter%30 == 0) {
      echoes.push(new triangle_object(triangles[i].x1,triangles[i].y1,triangles[i].x2,triangles[i].y2,triangles[i].x3,triangles[i].y3));
    }
  }
	// sketch, expand and randomize color for triangles
	// if echoes are wider than screen, remove them
  for(var h=0; h<echoes.length; h++) {
  	if(echoes[h].x1 < -windowWidth) {
  		echoes.splice(0,1);
  	}
    echoes[h].sketch();
    echoes[h].grow();
    echoes[h].redshift();
  }
	
}


function triangle_object(_x1,_y1,_x2,_y2,_x3,_y3) {
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2; 
  this.y2 = _y2;
  this.x3 = _x3;
  this.y3 = _y3;
  this.red = 200;
  
  this.redshift = function() {
    r = round(random(-70,70));
    this.red += r;
  }
  
  
  this.grow = function() {
    this.x1-=2;
    this.y1--;
    this.x2+=2;
    this.y2--;
    this.y3+=1.7;
  }
  
  this.sketch = function() {
    noFill();
    strokeWeight(counter*7%20);
    stroke(this.red,this.red,this.red);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
}