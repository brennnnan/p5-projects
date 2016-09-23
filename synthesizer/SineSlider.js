function SineSlider(xpos_, ypos_, w_, intensity_, frequency_, strokeC_, fillC_) {
  this.position = createVector(xpos_, ypos_);
  this.w = w_;

  this.previousY = 0;
  
  this.intensity = intensity_;
  this.frequency = frequency_;
 
  this.sliderX = 0;
  this.sliderY = 0;
  this.sliderHeight = 40;
  this.sliderWidth =40;
  this.value = 0;
  
  this.selected = false;
  this.strokeC = strokeC_;
  this.fillC = fillC_;

  
  this.display = function() {
    //update slider position
    this.update();
    
    stroke(this.strokeC);
    fill(this.fillC);
    
    // baseline
    this.drawBaseline();
    
    
    //slider

    ellipse(this.sliderX + this.position.x, this.sliderY, this.sliderHeight,this.sliderWidth )
  }
  
  this.update = function(){
    this.sliderX = map(this.value, 0, 255, 0, this.w); 
    this.sliderY = this.position.y + (sin(this.sliderX * this.frequency) * this.intensity);
    
    if(mouseIsPressed && mouseX > (this.sliderX+this.position.x)-this.sliderWidth/2 && mouseX < (this.sliderX+this.position.x)+this.sliderWidth/2 && mouseY > this.sliderY - this.sliderWidth/2 && mouseY < this.sliderY + this.sliderWidth/2){
      this.selected = true;
    }
    if(!mouseIsPressed){
      this.selected = false;
    }
    if(this.selected && mouseIsPressed && mouseX > this.position.x && mouseX < this.position.x + this.w){
      this.changeValue();
    }
    
  }
  
  this.changeValue = function() {
    this.value = map(mouseX, this.position.x, this.position.x + this.w, 0, 255);
    
    if(this.value < 0){
      this.value = 0;
    }else if(this.value > 255){
      this.value = 255;
    }
    
  }
  
  this.drawBaseline = function(){
    for (var i = 0; i < this.w; i++) {

      var p = this.position.y + (sin(i * this.frequency) * this.intensity);
      strokeWeight(1);
      stroke(this.strokeC);
      if (i > 0) {
        line(i + this.position.x, p, i + this.position.x - 1, this.previousY);
      }
      this.previousY = p;
    }
  }
  

}