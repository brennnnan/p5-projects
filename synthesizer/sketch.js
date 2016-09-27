buttons = []
voices = []
lastclicked = -1;
sines = []
volumes = [];
var sineslider1, sineslider2, sineslider3;
var volSlider1, volSlider2, volSlider3;
var a;
var dict = {};
dict['0'] = "sine";
dict['1'] = "square";
dict['2'] = "triangle";




function setup() {
  createCanvas(1200, 600);
  rectMode(CENTER);
  makeButtons();
  makeSliders();
  
  

}

function draw() {
  background(240)
  
  //Draw each button
  for(var i=0; i<buttons.length; i++) {
    buttons[i].sketch();
    buttons[i].oscSelector[0].sketch();
    buttons[i].oscSelector[1].sketch();
    buttons[i].oscSelector[2].sketch();
    if(buttons[i].active==1) {
      fill(10,240,10)
      ellipse(buttons[i].lediode.x,buttons[i].lediode.y,buttons[i].lediode.width,buttons[i].lediode.width)
      noFill();
    }
  }
  displaySliders();
  
  for(var f=0; f<voices.length; f++) {
    scaledfreq = map(sines[f].value, 0, 255, 220,1000)
    scaledVol = map(volumes[f].value,0,255,0.0,.99);
    
    voices[f].osc.freq(scaledfreq)
    if(buttons[f].active==1) voices[f].osc.amp(scaledVol);
  }
  
}

function makeSliders() {
  sineslider1 = new SineSlider(450, 150, 600, 50, 0.01, 0, '#A3C4BC');
  sineslider2 = new SineSlider(450, 300, 600, 50, 0.01, 0, '#A3C4BC');
  sineslider3 = new SineSlider(450, 450, 600, 50, 0.01,0,'#A3C4BC');
  volSlider1 = new SimpleSlider(300,150,100,70,'#A3C4BC');
  volSlider2 = new SimpleSlider(300,300,100,70,'#A3C4BC');
  volSlider3 = new SimpleSlider(300,450,100,70,'#A3C4BC');
  sines.push(sineslider1);
  sines.push(sineslider2);
  sines.push(sineslider3);
  volumes.push(volSlider1);
  volumes.push(volSlider2);
  volumes.push(volSlider3);
}

function displaySliders() {
  sineslider1.display();
  sineslider2.display();
  sineslider3.display();
  volSlider1.display();
  volSlider2.display();
  volSlider3.display();
}

function mousePressed() {
  //Check if any buttons were pressed
  for(var i=0; i<buttons.length; i++) {
    hit = collidePointCircle(mouseX,mouseY,buttons[i].x,buttons[i].y,buttons[i].width);
    if(hit) {
      buttons[i].pressed=1;
      lastclicked = i;
      break;
    }
  }
}

function mouseReleased() {
  //if button was pressed
  if(lastclicked >= 0) {
    buttons[lastclicked].pressed = 0;
    //turn button on or off
    if(buttons[lastclicked].active==0) {
      buttons[lastclicked].active=1;
      buttons[lastclicked].turnOn();
    } else {
      buttons[lastclicked].active=0;
      buttons[lastclicked].turnOff();
    }
    lastclicked = -1;
  }
}

function mouseClicked() {
  // for each voice button
  for(var ii=0; ii<buttons.length; ii++){
    // for each option
    for(var g=0; g<3; g++) {
      sizeOffset = buttons[ii].oscSelector[g].size/2;
      hit = collidePointRect(mouseX,mouseY,buttons[ii].oscSelector[g].x-sizeOffset,buttons[ii].oscSelector[g].y-sizeOffset,buttons[ii].oscSelector[g].size,buttons[ii].oscSelector[g].size);
      if(hit) {
        buttons[ii].clickSelector(g);
      }
    }
    
  }
}

function makeButtons() {
  buttons.push(new button(200,150,60,[200,200,200],0))
  buttons.push(new button(200,300,60,[151,151,151],1))
  buttons.push(new button(200,450,60,[100,100,100],2))
  voices.push(new voice(0,220,0,0,0))
  voices.push(new voice(0,440,0,0,0))
  voices.push(new voice(0,600,0,0,0))
}

function voice(wtype_,freq_,pan_,phase_,amp_){
  this.wtype = wtype_;
  this.freq = freq_;
  this.pan = pan_;
  this.phase = phase_;
  this.amp = amp_;
  this.active = 0;
  this.osc = new p5.SinOsc(this.freq);
}

function led(x_,y_,width_) {
  this.x = x_;
  this.y = y_;
  this.width = width_;
  this.active = 0;
}

function button(x_,y_,width_,rgb_,id) {
  this.x = x_;
  this.y = y_;
  this.width = width_;
  this.active = 0;
  this.pressed = 0;
  this.id = id;
  this.rgb = rgb_;
  this.lediode = new led(this.x-80,this.y,20);
  this.oscSelector = [0,0,0];
  this.oscSelector[0] = new oscTypeButton(this.x+50,this.y-24,0,20,1)
  this.oscSelector[1] = new oscTypeButton(this.x+50,this.y,1,20,0)
  this.oscSelector[2] = new oscTypeButton(this.x+50,this.y+24,2,20,0)
  
  
  this.clickSelector = function(selection) {
    // deselect other types and select new one
    for(var h=0; h<3; h++) {
      this.oscSelector[h].selected = 0;
    }
    this.oscSelector[selection].selected = 1;
    voices[this.id].osc.setType(dict[selection])
  }
  

  this.turnOn = function() {
    
    voices[this.id].osc.start()
    voices[this.id].osc.amp(0)
    voices[this.id].osc.amp(.5,3)
  }
  
  this.turnOff = function() {
    voices[this.id].osc.amp(.0,.7)
  }
  
  this.sketch = function() {
    fill(this.rgb[0],this.rgb[1],this.rgb[2])
    if(this.pressed==1) ellipse(this.x,this.y,this.width-5,this.width-5);
    else ellipse(this.x,this.y,this.width,this.width);
  }
}

function oscTypeButton(x_,y_,type_,size_,selected_) {
  this.type = type_;
  this.size = size_;
  this.x = x_;
  this.y = y_;
  this.selected = selected_;
  this.sketch = function() {
    noFill();
    
    if(this.selected==1) fill(100,170,220);
    
    // triangle
    if (this.type===2) {
      rect(this.x,this.y,this.size,this.size);
      edgeOffset = ((this.size-8)/2)
      triangle(this.x-edgeOffset,this.y+edgeOffset,this.x,this.y-edgeOffset,this.x+edgeOffset,this.y+edgeOffset);
    } // square
    else if(this.type==1) {
      rect(this.x,this.y,this.size,this.size);
      rect(this.x,this.y,this.size-8,this.size-8)
    }  // sine
    else if(this.type==0) {
      rect(this.x,this.y,this.size,this.size);
      ellipse(this.x,this.y,this.size-8,this.size-8);
    }
  
  }
}