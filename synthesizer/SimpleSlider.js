function SimpleSlider(xPos, yPos, w_, strokeC_, fillC_) {
  this.pos = createVector(xPos, yPos);
  this.sliderX;
  this.sliderHeight = 50;
  this.sliderWidth = 20;
  this.selected = false;
  this.value = 0;
  this.w = w_;
  
  this.strokeC = strokeC_;
  this.fillC = fillC_;

  this.update = function() {
    this.sliderX = this.pos.x + map(this.value, 0, 255, 0, this.w);
    
    if(mouseIsPressed && mouseX > this.sliderX-this.sliderWidth/2 && mouseX < this.sliderX+this.sliderWidth/2 && mouseY > this.pos.y - this.sliderHeight/2 && mouseY < this.pos.y + this.sliderHeight/2){
      this.selected = true;
      // this.changeValue();
    }
    if(!mouseIsPressed){
      this.selected = false;
    }
    
    if(this.selected && mouseIsPressed && mouseX > this.pos.x && mouseX < this.pos.x + this.w){
      this.changeValue();
    }

  }

  this.changeValue = function() {
    this.value = map(mouseX, this.pos.x, this.pos.x + this.w, 0, 255);
    if(this.value < 0){
      this.value = 0;
    }else if(this.value > 255){
      this.value = 255;
    }
  }

  this.display = function() {
    
    stroke(0);
    this.update();
    
    stroke(this.strokeC);
    fill(this.fillC);
    //baseline
    line(this.pos.x, this.pos.y, this.pos.x + this.w, this.pos.y);

    //slider
    rectMode(CENTER);
    rect(this.sliderX, this.pos.y, this.sliderWidth, this.sliderHeight);
  }

}