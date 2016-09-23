vals = new Array(1000);
dotarray = [];
var counter = 0;
var n = 0;
var offset = 120;
var stops = 0;
var mul = 20;
var firstoct = [65, 69, 73, 78, 82, 87, 92, 98, 104, 110, 117, 123];
var allkeys = [];
var cx, cy, cw;
var lines = [];
var button;

function setup() {


  if (windowWidth > 900 && windowHeight > 700) {
    createCanvas(windowWidth, windowHeight);
    offset = (windowWidth - 660) / 2
    cx = windowWidth;
    cy = windowHeight;
    cw = 100;
  } else {
    createCanvas(900, 700);
    cx = 900;
    cy = 700;
    cw = 60;
  }
  imageMode(CENTER);
  noStroke();

  var ind = 0;
  var m = 10;
  var d = -.4;
  // fill array that determines circle swell width
  for (var g = 0; g < 1000; g++) {
    n = (cos(2 * (pow(d, 2))) + sin(20 * (pow(d, 3))));
    vals[g] = (n + .28) * 0.90292494784;
    if (vals[g] < m) {
      m = vals[g];
      ind = g;
    }
    d += .00105;
  }
  vals[1000] = 0;

  //Make the dots
  //keep track of which frequencies are being grabbed
  freqcounter = 0
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 12; j++) {
      allkeys.push(firstoct[j] * (pow(2, i)));
      dotarray.push(new dot(counter, (j * 60) + offset, (i + 2) * 60, vals[784] * 20, 784, false, allkeys[freqcounter]));
      counter++;
      freqcounter++;
    }
    freqcounter -= 5;
  }

  fill('rgba(10,100,200,.8');
  var g = 30;
  button = new dot(-10, cx / 2, cy - cw, cw, 0, 0, 0)

}

function draw() {

  stops = 0;
  background('#0E767B');
  fill('#17BEBB');

  for (var c = 0; c < counter; c++) {
    if (dotarray[c].clicked) {
      //assigning width and amp to each dot if it has been click
      dotarray[c].index += 1;
      num = ((dotarray[c].index) % (1000));
      dotarray[c].width = vals[num] * mul;
      dotarray[c].vibrator.amp(dotarray[c].width / 2)
    }

    ellipse(dotarray[c].xctr, dotarray[c].yctr, dotarray[c].width, dotarray[c].width);

  }
  fill('#D4F4DD');
  stroke(51);
  strokeWeight(1);
  ellipse(button.xctr, button.yctr, button.width, button.width);
  noStroke();

  for (var dd = 0; dd < lines.length; dd++) {
    strokeWeight(1);
    stroke(51)
    line(lines[dd].x1, lines[dd].y1, lines[dd].x2, lines[dd].y2);
    noStroke();
    if (lines[dd].v === 0) {
      lines[dd].x1--;
      lines[dd].y2++;
    } else {
      lines[dd].x2++;
      lines[dd].y1++;
    }
  }

}

function mouseClicked() {

  for (var f = 0; f < counter; f++) {
    hit = collidePointCircle(mouseX, mouseY, dotarray[f].xctr, dotarray[f].yctr, dotarray[f].width);

    if (hit) {
      if (dotarray[f].clicked == true) {
        dotarray[f].clicked = false;
        dotarray[f].vibrator.amp(0, .2);
        //console.log("turning off");
        return;
      }
      dotarray[f].clicked = true;
      dotarray[f].vibrator = new p5.Oscillator(dotarray[f].oscfreq, 'sine');
      dotarray[f].vibrator.amp(.5, .2);
      dotarray[f].vibrator.start();
      return;
    }
  }


}

function mousePressed() {
  hit = collidePointCircle(mouseX, mouseY, cx / 2, cy - cw, cw);
  if (hit) {
    button.clicked = 1;
    button.width -= 10;
  }
}


function mouseReleased() {
  if (button.clicked == 1) {
    button.clicked = 0;
    button.width += 10;
    for (var ii = 0; ii < dotarray.length; ii++) {
      if (dotarray[ii].vibrator != 0) dotarray[ii].vibrator.stop();

      dotarray[ii].width = vals[784] * 20;
      dotarray[ii].clicked = 0;
    }
  }
}



function dot(_id, _xctr, _yctr, _width, _index, _clicked, _osc) {
  this.id = _id;
  this.oscfreq = _osc;
  this.xctr = _xctr;
  this.yctr = _yctr;
  this.width = _width;
  this.index = _index;
  this.clicked = _clicked;
  this.vibrator = 0;

}