shapes=[];
edges=[];

function setup() {
  createCanvas(1000, 700);
  imageMode(CENTER);
  background(255);
  stroke(51);
 
  line(0,0,1000,0);
  edges.push(new edge(0,0,1000,0));
  line(0,0,0,700);
  edges.push(new edge(0,0,0,700));
  line(0,700,700,1000);
  edges.push(new edge(0,700,700,1000));
  line(1000,700,1000,0);
  edges.push(new edge(1000,700,1000,0));
  
}

function draw() {
  console.log(shapes.length)
  sum=0;
  background(255);
  for(var c=0; c<shapes.length; c++){
    for(var t=0; t<4;t++) {
      collideLineCircle(edges[t].x1,edges[t].y1,edges[t].x2,edges[t].y2,shapes[c].xc,shapes[c].yc);
      
    }
    
    ellipse(shapes[c].xc,shapes[c].yc,shapes[c].width,shapes[c].width);
    shapes[c].width+=2;
    shapes[c].yc++;
  }
}

function mouseClicked() {
  edges.push(mouseX,mouseY,50,1,1);
}

function shape(xct,yct,w,orientat,gr) {
 this.xc=xct;
 this.yc=yct;
 this.width=w;
 this.orientation=orientat;
 this.dir=gr
}

function edge(a,b,c,d){
  this.x1=a;
  this.y1=b;
  this.x2=c;
  this.y2=d;
}