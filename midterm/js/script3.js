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
    case "1": efill=color(227, 242, 240); break;
    case "2": efill=color(166, 193, 191);  break;
    case "3": efill=color(101, 122, 120); break;
    case "4": efill=color(13, 40, 38); break;
    case "5": efill=color(5, 15, 14); break;
    case "6": efill=color(193, 176, 166); break;
    case "7": efill=color(173, 148, 133); break;
    case "8": efill=color(114, 88, 72); break;
    case "9": efill=color(81, 58, 44); break;
    case "0": efill=color(53, 36, 26); break;

  }

  switch(keyCode){
    case LEFT_ARROW: currentImage = constrain(currentImage-1, 1, maxImages);
    background(bgcolor); break;
    case RIGHT_ARROW: currentImage = constrain(currentImage+1, 1, maxImages);
    background(bgcolor); break;
  }
}
