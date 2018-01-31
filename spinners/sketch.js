a = []
i = 0;
ii=0
var top;


function setup() {
  createCanvas(1000,800)
  angleMode(DEGREES)
  rectMode(CENTER)
  makeArray()
}

function makeArray() {
  topval = 8
  //console.log(topval)
  for(g=0; g<topval; g+=.2) {
    a.push(g)
  }
  for(g=topval; g>0; g-=.15) {
    a.push(g)
  }
  
}

function draw() {
  clear()
  translate(width/2,height/2)
  value = a[i%a.length]
  ii += value
  
  rotate(ii)
  fill(10,200,250)
  rect(0,0,200,200)
  rotate(2*-ii)
  fill(30,100,100)
  rect(0,0,80,80)
  i++
}