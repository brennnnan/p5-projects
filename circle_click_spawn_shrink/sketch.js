shapes=[];
sum=0;

function setup() {
  createCanvas(1000, 700);
  imageMode(CENTER);
  background(255);
  stroke(51);
  frameRate(30);
  //noFill();
}


function mouseClicked() {
  
  shapes.push(new shape(mouseX,mouseY,2,1));
}

function draw() {
  background(255);
  for(var i=0; i<shapes.length;i++){
    for(var g=0;g<shapes.length;g++){
      if(g==i) continue;  
      hit=collideCircleCircle(shapes[i].xc,shapes[i].yc,shapes[i].width,shapes[g].xc,shapes[g].yc,shapes[g].width);
      sum+=hit;
    }
    
    console.log(sum);
    if(sum>0) shapes[i].dir=0;
    if(shapes[i].dir==1){
      shapes[i].width++
    } else shapes[i].width--;
    if(shapes[i].width==1) shapes[i].dir=1;
    ellipse(shapes[i].xc,shapes[i].yc,shapes[i].width,shapes[i].width);
    sum=0;
  }
  
}


function shape(xct,yct,w,gr) {
 this.xc=xct;
 this.yc=yct;
 this.width=w;
 this.dir=gr
}