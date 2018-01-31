var myHeadband;
var shape;
var points = [];

function headband() {
  this.upperL = createVector(100,100);
  this.upperR = createVector(1100,100);
  this.bottomL = createVector(100,300);
  this.bottomR = createVector(1100,300);
  this.squares = []
  
  this.sketch = function() {
    quad(this.upperL.x,this.upperL.y,this.upperR.x,this.upperL.y,this.bottomR.x,this.bottomR.y,this.bottomL.x,this.bottomL.y);
    for(var ii=0; ii<this.squares.length; ii++) {
      this.squares[ii].sketch();
    }
    this.changeSize();
  }
  
  this.createSquares = function(num) {
    var boxWidth = 1000/(num+1);
    for(var i=0; i<num; i++) {
      this.squares.push(new square(100+(boxWidth*(i+1)), 200,50));
    }
  }
  
  this.changeSize = function() {
    for(var g=0; g<this.squares.length; g++) {
      if(this.squares[g].width >= 160) this.squares[g].growing = 0;
      if(this.squares[g].width <= 50) this.squares[g].growing = 1;
      if(this.squares[g].growing==1) this.squares[g].width++;
      if(this.squares[g].growing==0) this.squares[g].width--;
    }
  }
}


function setup() {
  rectMode(CENTER); 
  createCanvas(1200,800);
  frameRate(15);
  myHeadband = new headband;
  myHeadband.createSquares(4);
  console.log(myHeadband.squares)
}

function square(_x, _y, _width) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.growing = 0;
  
  this.sketch = function() {
    rect(this.x, this.y,this.width,this.width);
  }
}



function draw() {
  clear()
  myHeadband.sketch();

}

