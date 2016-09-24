swellValues = new Array(1000);
dotArray = [];
colors = [];
index = -1;
bgFill = 'rgba(64,224,208,1)'
dotFill = 'rgb(173,255,204)'

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  background(255);
  stroke(51);
  noStroke();
  
  makeSwellValues()
  makeDots()
  makeColors()
  
}

function makeColors() {
  colors.push(['#D9BBF9','#4E5283'])
  colors.push(['#FCFFFC','#040F0F'])
  colors.push(['#D6F9DD','#99F7AB'])
  colors.push(['#C0D6DF','#4F6D7A'])
  colors.push(['#B2ECE1','#2191FB'])
  //colors.push(['#3B7080','#8338EC'])  
  colors.push(['#F1F7EE','#B0BEA9'])
  colors.push(['#E9F1F7','#54426B'])
  colors.push(['#413C58','#A3C4BC'])
}

function makeSwellValues() {
  var speed = -.4;
  var n = 0
  for(var g=0; g<1000; g++){
    n=(cos(2*(pow(speed,2)))+sin(20*(pow(speed,3))));
    swellValues[g] = n+.4;
    speed += .00105;
  }
}

function makeDots() {
  var counter=0;
  var baseX = (windowWidth-660)/2
  for (var i=0; i<8; i++){
    for (var j=0; j<12; j++){
      dotArray.push(new dot(counter,(j*60)+baseX,(i+2)*60,swellValues[round((noise(counter)*1000)%1000)],(round(noise(counter)*1000)%1000)));
      counter ++;
    }
  }
  fill('rgba(10,100,200,.8');
}

function draw() {
  var multiplier = 20;
  background(bgFill);
  fill(dotFill);
  for (var c=0;c<dotArray.length;c++){
    dotArray[c].index+=3;
    num = ((dotArray[c].index)%(1000));
    dotArray[c].width = swellValues[num];
    ellipse(dotArray[c].xctr,dotArray[c].yctr,dotArray[c].width*multiplier,dotArray[c].width*multiplier);
  }
  
}

function mouseClicked() {
  index = (index+1)%colors.length;
  bgFill = colors[index][0]
  dotFill = colors[index][1]
  
  
}


function dot(_id, _xctr, _yctr, _width, _index){
  this.id=_id;
  this.xctr=_xctr;
  this.yctr=_yctr;
  this.width=_width;
  this.index=_index;
}