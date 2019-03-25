var index = 0;
var points = [];
var squares = [];
var adjmatrix;
var scores = [0, 0];
var disp;


var goagain = 0;


var lastclicked = -1;
var turn = 0;

function setup() {
  console.log(scores[0]);
  //creates canvas for game
  var dimension = 600;
  createCanvas(800, 800);
  imageMode(CENTER);
  noStroke();
  background(255);
  stroke(0);
  
  

  //distance between points in px
  var increments = 60;
  //width of points
  var diameter = 10

  //creates array of points on board
  for (var ycoord = increments; ycoord < dimension - increments + 1; ycoord += increments) {
    for (var xcoord = increments; xcoord < dimension - increments + 1; xcoord += increments) {
      fill(51);
      strokeWeight(2);
      stroke(0, 0, 0);
      ellipse(xcoord, ycoord, diameter, diameter);
      points.push(new dot(index, xcoord, ycoord, false, false, diameter));
      index++;
    }
  }

  //populates adjacency matrix with zeroes for connections
  adjmatrix = new Array(index - 1);
  for (var ii = 0; ii < index; ii++) {
    adjmatrix[ii] = new Array(index - 1);
    for (var h = 0; h < index; h++) {
      adjmatrix[ii][h] = 0;
    }

  }
  //creates array of square objects to represent successes
  makesquares(increments);
  var player = 1;
  fill(255);
  disp = rect(60, 600, 200, 55, 20);


}


function mouseClicked() {

  for (var j = 0; j < points.length; j++) {
    hit = collidePointCircle(mouseX, mouseY, points[j].x_ctr, points[j].y_ctr, points[j].rad);
    if (hit) {
      points[j].clicked = true;
      if (lastclicked >= 0) {
        if (j % 9 != 0 && (j == lastclicked + 1 || j == lastclicked - 1 || j == lastclicked + 9 || j == lastclicked - 9)) {
          connect_the_dots(j);
          lastclicked = -1;
          turn = (turn + 1) % 2;
          for (var t = 0; t < squares.length - 1; t++) {
            squares[t].check_connection();
          }
          return;
        }
      }
      if (lastclicked == -1) {
        stroke(5, 200, 210);
        ellipse(points[j].x_ctr, points[j].y_ctr, points[j].rad, points[j].rad);
        lastclicked = j;
      }
      return;
    }
  }
  
  for (var u=0; u<squares.length; u++){
    colorswitch = collidePointRect(mouseX, mouseY, squares[u].x_ctr, squares[u].y_ctr, squares[u].width, squares[u].width);
    if (colorswitch && squares[u].enclosed===true) {
      squares[u].owner = 1;
      scores[0] --;
      scores[1] ++;
      console.log('switch colors')
      fill('rgba(0,30,200, .4)');
      rect(squares[u].x_ctr, squares[u].y_ctr, squares[u].width, squares[u].width);
      return;
    }
  }
  
  bam = collidePointRect(mouseX, mouseY, 60, 600, 200, 55);
  console.log('bam');
  if (bam) {
    text("Player 1:  "+ scores[0], 130, 634);
    text("Player 2:  " + scores[1], 320, 634);
  }
}

function draw() {
  //background(255)
  fill(51);
  noStroke();
  textSize(24);
  text("Player 1:  "+ scores[0], 130, 634);
  text("Player 2:  " + scores[1], 320, 634);
  
  
}

function connect_the_dots(j) {
  strokeWeight(2);
  line(points[lastclicked].x_ctr, points[lastclicked].y_ctr, points[j].x_ctr, points[j].y_ctr);
  stroke(5, 200, 210);
  ellipse(points[j].x_ctr, points[j].y_ctr, points[j].rad, points[j].rad);
  ellipse(points[lastclicked].x_ctr, points[lastclicked].y_ctr, points[lastclicked].rad, points[lastclicked].rad);
  adjmatrix[lastclicked][j] = 1;
  adjmatrix[j][lastclicked] = 1;
  lastclicked = j;
}

function makesquares(increments) {
  for (var g = 0; g < index - 9; g++) {
    if ((g + 1) % 9 === 0 && g !== 0) continue;
    var a = new square(g, points[g].x_ctr, points[g].y_ctr, increments, 0, false, g, -1);
    squares.push(a);
  }
}

function whoseturn() {

}

//function player(_id, _name, _r, _g, _b)
function square(_id, _x_ctr, _y_ctr, _width, _totalsides, _enclosed, _uprlft, _owner) {
  this.id = _id;
  this.x_ctr = _x_ctr;
  this.y_ctr = _y_ctr;
  this.width = _width;
  this.totalsides = _totalsides;
  this.enclosed = _enclosed;
  this.uprleft = _uprlft;
  this.uprright = this.uprleft + 1;
  this.btmleft = this.uprright + 8;
  this.btmright = this.btmleft + 1;
  this.owner = _owner;
  //fill('rgba(0,255,0, 0.25)');
  //rect(this.x_ctr,this.y_ctr,this.width, this.width);



  this.check_connection = function() {
    if (this.enclosed === true) {
      return;
    }
    var sum = 0;
    sum += adjmatrix[this.uprleft][this.uprright];
    sum += adjmatrix[this.uprright][this.btmright];
    sum += adjmatrix[this.btmright][this.btmleft];
    sum += adjmatrix[this.btmleft][this.uprleft];
    if (sum == 4) {
      this.enclosed = true;
      this.claimsquare();
      turn = (turn + 1) % 2;
    }
    this.totalsides = sum;
    //console.log('sum:'+sum);

  }

  this.claimsquare = function() {

    fill('rgba(0,255,0, 0.25)');
    rect(this.x_ctr, this.y_ctr, this.width, this.width);
    this.owner = 0;
    scores[this.owner] += 1;
    

  }

}



function dot(_id, _x_ctr, _y_ctr, _clicked, _connected, _diameter) {

  this.id = _id;
  this.x_ctr = _x_ctr;
  this.y_ctr = _y_ctr;
  this.clicked = _clicked;
  this.connected = _connected;
  this.rad = _diameter;

}