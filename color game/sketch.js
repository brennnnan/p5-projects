var sceneInstance;
var canvas;
var gameInstance;
var selected = -1;
var plop1, plop2, sparkle;

function preload() {
  plop1 = loadSound('plop1.wav');
  plop2 = loadSound('plop2.wav');
  sparkle = loadSound('sparkle.wav');
  sparkle.setVolume(.2);
}

function game() {
  this.scene = new scene();
  this.score = 0;
  this.turn = -1;
  this.attempts = 0;
  
  this.colorBoard = function() {
    for(var f=0; f<this.scene.dots.length; f++) {
      this.scene.dots[f].newColor();
    }
    var rando = round(random(this.scene.dots.length));
    this.scene.ball.clr = this.scene.dots[rando].clr;
  }
}

function scene() {
  this.ball = new ball(windowWidth/2+200,100,100);
  this.dots = [];
  
  
  this.create = function() {
    for(var j=0; j< 5; j++) {
      for(var k=0; k<5; k++) {
        this.dots.push(new ball((k*100)+100,(j*100)+100,60))
      }
    }
  }
  
  this.sketch = function() {
    for(var i=0; i<this.dots.length; i++) {
      this.dots[i].sketch();
    }
    this.ball.sketch();
  }
}

function setup() {
  canvas = createCanvas(1000,800);
  gameInstance = new game();
  gameInstance.scene.create();
  gameInstance.colorBoard();
}

function draw() {
  background(250)
  gameInstance.scene.sketch()
}

function mousePressed() {
  for(var g=0; g<gameInstance.scene.dots.length; g++) {
  //console.log(mouseX+" "+gameInstance.scene.dots[g].x +" "+ mouseY+" "+gameInstance.scene.dots[g].y +"    "+gameInstance.scene.dots[g].width);
    hit = collidePointCircle(mouseX,mouseY,gameInstance.scene.dots[g].x,gameInstance.scene.dots[g].y,gameInstance.scene.dots[g].width);
    if(hit) {
      gameInstance.scene.dots[g].width-=10;
      selected = g;
      plop1.play();
      gameInstance.attempts ++;
    }
  }
}

function mouseReleased() {
  if(selected >= 0){
    gameInstance.scene.dots[selected].width += 10;
    plop2.play();
    if(gameInstance.scene.dots[selected].clr == gameInstance.scene.ball.clr) {
      gameInstance.colorBoard();
      sparkle.play();
      gameInstance.score++;
    }
  }
  selected = -1;
  console.log('score: '+gameInstance.score+'/'+gameInstance.attempts);
}

// ball constructor
function ball(_x,_y,_width) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.clr = [0,0,0]
  
  this.sketch = function() {
    fill(this.clr[0],this.clr[1],this.clr[2]);
    ellipse(this.x,this.y,this.width,this.width);
  }
  
  this.newColor = function() {
    this.clr = [round(random(255)),round(random(255)),round(random(255))];
  }
  
}