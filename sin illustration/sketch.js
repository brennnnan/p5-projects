var points = [];
var points1 = [];

function setup() {
  createCanvas(1200,800);
  var n = 60;
  var inc = TWO_PI/n
  var i=0;
  var d = 0;
  points.push(0)
  for(i+1; i<n/2; i++) {
    points.push(300*sin(d+=inc))
    if(points[i]<points[i-1]) console.log(i-1)
  }
  i = 0;

}

function draw() {
  var h=0;
  var spacing = 18;
  for(h;h<points.length;h++) {
    stroke(51);
    line(100+(h*spacing),400,100+(h*spacing),400-points[h]);
    line()
 
  }
  
}