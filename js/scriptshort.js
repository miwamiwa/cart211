var frame, zed, rx, ry, bg, diam, txtsize, maxx, shape, mshapes;
var maxinit;
var hi;
var a, b, c, fact;
var lastWidth, thisHeight, canvas;
var defHeight=280;

function setup(){

  lastWidth=window.innerWidth-20;
  background(255);

  if(window.innerHeight-100<defHeight){
    thisHeight=window.innerHeight-50;
  }
  else{
    thisHeight=defHeight;
  }
  canvas = createCanvas(lastWidth,thisHeight);
  canvas.parent('sketch-holder');

  frameRate(8);

  zed=14;
  bg=255;
  frame=0;
  diam=window.innerHeight/20;
  txtsize=window.innerHeight/10;
  background(bg);
  hi="";
  maxx=6;
  maxinit=maxx;
  mshapes=4;
  shape=0;
  textFont('Inconsolata');
  fct=40;
}

function draw(){

  if(lastWidth!=window.innerWidth-20){
    update();
  }
  if(shape==mshapes){
    fill(bg);
    noStroke();
    rect(0, 0, width, height);
    shape=0;
    mshapes=round(random(4, 12));
  }

  frame+=1;
  frame=constrain(frame, 0, maxx);

  for(var i=0; i<frame; i++){
    zed=zed*(-1);
    noStroke();
    var red=constrain(random(a-fct, a+fct), 0, 255);
    var gre=constrain(random(b-fct, b+fct), 0, 255);
    var blu=constrain(random(c-fct, c+fct), 0, 255);
    fill(red, gre, blu);c
    ellipse(rx+width/2+i,ry+ height/2+zed*i, diam+zed*i, diam+zed*i);
  }

  if(frame==maxx){
    rx=round(random(-width/3,width/3));
    ry=round(random(-height/3,height/3));
    frame=0;
    maxx=round(random(2, maxinit));
    shape+=1;
    a=random(0, 255);

    // pick next starting colour
    if(random()<0.5){
      b=255-a+random(-30, 30);
      c=random(255);
    }
    else {
      c=255-a+random(-30, 30);
      b=random(255);
    }
  }

  fill(225+zed);
  textSize(txtsize);
  text(hi, width/2-hi.length/2+zed/5, height/2-txtsize/2+zed/5);
}

// update canvas size

function update(){
  
  lastWidth=window.innerWidth-20;
  background(255);
  if(window.innerHeight-100<defHeight){
    thisHeight=window.innerHeight-50;
  }
  else{
    thisHeight=defHeight;
  }
  canvas = createCanvas(lastWidth,thisHeight);
  canvas.parent('sketch-holder');
  frame=0;
  shape=0;
  diam=window.innerHeight/20;
  txtsize=window.innerHeight/10;
}

function mousePressed(){

  console.log(mouseX+" "+mouseY);
  if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
    frame=0;
    rx=mouseX-width/2;
    ry=mouseY-height/2;
  }
  a=random(0, 255);
  if(random()<0.5){
    b=255-a+random(-30, 30);
    c=random(255);
  }
  else {
    c=255-a+random(-30, 30);
    b=random(255);
  }
}
