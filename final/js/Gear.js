function Gear(x, y, dial, width, height){
  this.x = x;
  this.y = y;
  this.angle =0;
  this.dial =dial;
  this.w = width;
  this.h = height;
  this.r = 0;
  this.g = 185;
  this.b = 165;
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
  tint(this.r, this.g, this.b);
  image(gearPic, 0, 0, this.w, this.h);
  pop();
}
