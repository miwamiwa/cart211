var canvas;
var lastWidth=0;
var lastHeight=0;
var bgcolor=145;
var efill=0;
function setup(){
  console.log("yoooo")
canvas=  createCanvas(window.innerWidth, window.innerHeight);
canvas.parent('sketch-holder2');
background(bgcolor);
noStroke();
}
function draw(){
console.log("yo")
if(lastWidth!=window.innerWidth||lastHeight!=window.innerHeight){update();}
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
}
