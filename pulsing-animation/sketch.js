dotarray = [];
vals = new Array(1000);
da = [];
var counter=0;
var n=0;
var stops=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  background(255);
  stroke(51);
  noStroke();
  
  var d=-.4;
  var k=0;
  var p=1;
  for(var g=0; g<1000; g++){
    n=(cos(2*(pow(d,2)))+sin(20*(pow(d,3))));
    vals[g] = n+.4;
    d += .00105;
    if(vals[g]<p){
      k=g;
      p=vals[g];
    }
    
  }
  for (var i=0; i<8; i++){
    dotarray.push(new Array(12));
    for (var j=0; j<12; j++){
      dotarray[i].push(new dot(counter,j*40,(i+2)*40,vals[10*counter]),10*counter);
      da.push(new dot(counter,(j+2)*60,(i+2)*60,vals[round((noise(counter)*1000)%1000)],(round(noise(counter)*1000)%1000)));
      counter ++;
    }
  }

  
  fill('rgba(10,100,200,.8');
  
}

function mouseClicked(){
  
}

function draw() {
  /*if (stops<5){
    stops++;
    return;
  } */
  stops = 0;
  background('rgba(64,224,208,1)');
  fill('rgb(173,255,204)');
  for (var c=0;c<counter;c++){
    da[c].index+=3;
    numb = ((da[c].index)%(1000));
    da[c].width = vals[numb];
    //if(c==5){
    var mul=20;
    ellipse(da[c].xctr,da[c].yctr,da[c].width*mul,da[c].width*mul);
    //}
  }
  
}



function dot(_id, _xctr, _yctr, _width, _index){
  this.id=_id;
  this.xctr=_xctr;
  this.yctr=_yctr;
  this.width=_width;
  this.index=_index;
}