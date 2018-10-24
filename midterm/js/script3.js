var canvas;
var lastWidth=0;
var lastHeight=0;
var bgcolor=145;
var efill=0;
var image1, image2, image3, image4;
var currentImage=1;
var maxImages=4;

function preload(){
  image1 = loadImage("images/esquisse1.jpg");
  image2 = loadImage("images/esquisse2.jpg");
  image3 = loadImage("images/esquisse3.jpg");
  image4 = loadImage("images/esquisse4.jpg");

}
function setup(){
canvas=  createCanvas(window.innerWidth, window.innerHeight);
canvas.parent('sketch-holder2');
background(bgcolor);
noStroke();
}

function draw(){
if(lastWidth!=window.innerWidth||lastHeight!=window.innerHeight){
  update();
}
var img=0;
var imgScale = window.innerWidth/3000;
switch(currentImage){
  case 1: img = image1; break;
  case 2: img = image2; break;
  case 3: img = image3; break;
  case 4: img = image4; break;
}
image(img, 0.485*width, 0.35*height, img.width*imgScale, img.height*imgScale);
}

function mousePressed(){
  fill(efill);
  ellipse(mouseX, mouseY, 100, 100);

}
function mouseDragged(){
  fill(efill);
  ellipse(mouseX, mouseY, 300, 300);

}
function update(){
  lastWidth=window.innerWidth;
  lastHeight=window.innerHeight;
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(bgcolor);
canvas.parent('sketch-holder2');

}
function keyPressed(){
  switch(key){
    case "1": efill=color(198, 60, 17); break;
    case "2": efill=color(40, 12, 3); break;
    case "3": efill=color(12, 38, 19); break;
    case "4": efill=color(11, 30, 38); break;
    case "5": efill=color(20, 29, 33); break;
    case "6": efill=color(43, 28, 28); break;
    case "7": efill=color(13, 7, 17); break;
    case "8": efill=color(14, 33, 31); break;
    case "9": efill=color(13, 22, 21); break;
    case "0": efill=color(0); break;

  }

  switch(keyCode){
    case LEFT_ARROW: currentImage = constrain(currentImage-1, 1, maxImages);
    background(bgcolor); break;
    case RIGHT_ARROW: currentImage = constrain(currentImage+1, 1, maxImages);
    background(bgcolor); break;
  }
}
