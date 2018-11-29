function Gear(x, y, dial, width, height){
  this.x = x;
  this.y = y;
  this.angle =0;
  this.dial =dial;
  this.w = width;
  this.h = height;
  this.opacity =85;
  switch(floor(random(0, 3))){
    case 0: this.chosenfill = color(166, 193, 191,   this.opacity); break;
    case 1: this.chosenfill = color(193, 176, 166,   this.opacity); break;
    case 2: this.chosenfill = color(173, 148, 133,   this.opacity); break;
  }

  this.direction=0;
  if(this.dial%2===0){
    this.direction = 1;
  }
  else {
    this.direction = -1;
  }
}

Gear.prototype.display = function(){

  this.angle = map(currentT[this.dial], 0, 60, 0, this.direction*2*PI);
  //  console.log("ANGLE "+currentT[this.dial])
  push();
  imageMode(CENTER);
  translate(this.x, this.y);
  rotate(this.angle);
  tint(this.chosenfill);
  image(gearPic, 0, 0, this.w, this.h);
  pop();
}
