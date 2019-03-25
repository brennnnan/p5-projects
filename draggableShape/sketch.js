function draggableShape(x_,y_,w_,stroke_,fill_) {
  this.position = createVector(x_,y_);
  this.width = w_;
  this.strokeColor = stroke_;
  this.fillColor = fill_;
  this.active = 0;
  var offsetx = 0;
  var offsety = 0;
  
  
  this.update = function() {
    if(mouseIsPressed && this.active === 0) {
      hit = collidePointCircle(mouseX, mouseY, this.position.x, this.position.y, this.width)
      if (hit) {
        this.active = 1;
        offsetx = mouseX - this.position.x;
        offsety = mouseY - this.position.y;
      }
    } else if(mouseIsPressed && this.active == 1) {
      this.position.x = mouseX - offsetx;
      this.position.y = mouseY - offsety;
    }
    
    
  }
  
  this.show = function() {
    console.log(this.active)
    
  }
  
}