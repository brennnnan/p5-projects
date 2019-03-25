var shape, b, c;

function setup() {
  createCanvas(700,700);
  shape = new draggableCircle(300,300,100,0,200);
  b = new draggableRect(500,300,100,100,0,200);
  c = new draggableTriangle(500,300,100,0,200);
}

function draw() {
  background(255)
  shape.display();
  b.display();
  c.display();
}