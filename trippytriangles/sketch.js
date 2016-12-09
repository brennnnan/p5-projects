triangles = [];
echoes = []
csize = 900;
middle = csize/2;
counter = 0;
function setup() {
  //frameRate()
  canvas = createCanvas(csize,csize);
  triangles.push(new triangle_object(middle - 100,middle-100,middle+100,middle-100,middle,middle+100));
}

function draw() {
  background(30);
  counter++
  for(var i=0; i<triangles.length; i++) {
    triangles[i].sketch();
    triangles[i].paramshift(2);
    triangles[i].redshift();
    console.log(triangles[i])
    if(counter%50 == 0) {
      echoes.push(new triangle_object(triangles[i].x1,triangles[i].y1,triangles[i].x2,triangles[i].y2,triangles[i].x3,triangles[i].y3));
    }
  }
  for(var h=0; h<echoes.length; h++) {
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
    this.x1--;
    this.y1--;
    this.x2++;
    this.y2--;
    
    this.y3++;
  }
  
  this.sketch = function() {
    noFill();
    strokeWeight(counter*7%20);
    stroke(this.red,this.red,this.red);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
}