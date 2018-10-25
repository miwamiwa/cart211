var canvas;
var lastWidth=0;
var lastHeight=0;
var bgcolor=145;
var efill=0;
function setup(){

  canvas=  createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('sketch-holder2');
  background(bgcolor);
  noStroke();
}
function draw(){

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
}
/*


*/
