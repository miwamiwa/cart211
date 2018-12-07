var frame, zed, rx, ry, bg, diam, txtsize, maxx, shape, mshapes;
var maxinit;
var r2x;
var r2y;
var hi;
var frame2, maxx2;
var e1x= [0];
var e1y= [0];
var e2x= [0];
var e2y= [0];
var e2d= [0];
var e2d= [0];
var strWindowFeatures;
var link;
var shape1done=false;
var shape2done=false;
var lastWidth, thisHeight;
var canvas;

function setup(){
  strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
  lastWidth=window.innerWidth-20;
  if(window.innerHeight-100<500){
    thisHeight=window.innerHeight-50;
  } else{thisHeight=500;}
  canvas = createCanvas(lastWidth,thisHeight);
  canvas.parent('sketch-holder');
  frameRate(8);
  zed=18;
  bg=255;
  frame=1; frame2=0;
  diam=window.innerHeight/10;
  txtsize=window.innerHeight/10;
  background(bg);
  fill(85);
  textSize(14);
  text("click on canvas to refresh", width-200, height);
  hi="final";
  maxinit=8;
  maxx=round(random(4, maxinit));;
  maxx2=round(random(4, maxinit));;
  e1x= [maxx];
  e1y=[maxx];
  e1d= [maxx];
  e2x= [maxx];
  e2y= [maxx];
  e2d= [maxx];
  mshapes=4;
  shape=0;
  textFont('Inconsolata');


  if(random()<0.5){
    rx=random(500,width-width/8);
    ry=random(height/8,height-height/8);
  }
  else{
    rx=random(width/8,500);
    ry=random(200,height-height/8);
  }
  if(random()<0.5){
    r2x=random(500,width-width/8);
    r2y=random(height/8,height-height/8);
  }
  else{
    r2x=random(width/8,500);
    r2y=random(200,height-height/8);
  }


}


function draw(){
  if(lastWidth!=window.innerWidth-20){
    update();
  }

  if(frame>maxx){
    shape1done=true;
  }

  if(!shape1done) { frame+=1;
  }
  for(var i=0; i<frame; i++){
    if(frame<maxx){
      zed=zed*(-1);
      noStroke();
      fill(random(235, 255),random(0, 95),random(0, 95));
      ellipse(rx+i,ry+zed*i, diam+zed*i, diam+zed*i);
      e1x[i]=rx+i;
      e1y[i]=ry+zed*i;
      e1d[i]=abs(diam+zed*i);
      fill(150+2*zed);
      textSize(txtsize);
      text("midterm", e1x[i]+e1d[i]/2+20, e1y[i]+20);
      textSize(12);
      //text("click objects to follow link \nclick elsewhere to shuffle objects",width-250, height/2-24*i);
    }
  }

  if(!shape2done) {
    frame2+=1;
  }
  if(frame2<=maxx2){
    if(frame2<maxx2){

      for(var j=0; j<frame2; j++){
        zed=zed*(-1);
        noStroke();
        fill(random(0, 95),random(0, 95),random(235, 255));
        ellipse(r2x+j, r2y+ zed*j, diam+zed*j, diam+zed*j);
        e2x[j]=r2x+j;
        e2y[j]=r2y+zed*j;
        e2d[j]=abs(diam+zed*j);
        fill(150+zed*2);
        textSize(txtsize);
        var texties="exam";
        text(texties, e2x[j]-e2d[j]/2-20-textWidth(texties), e2y[j]-20);
      }
    }
  }




}

function update(){
  lastWidth=window.innerWidth-20;
  background(255);

  if(window.innerHeight-100<500){
    thisHeight=window.innerHeight-50;
  }
  else{
    thisHeight=500;
  }
  canvas = createCanvas(lastWidth,thisHeight);
  canvas.parent('sketch-holder');
  textFont("Consolas");

  fill(85);
  textSize(14);
  text("click on canvas to refresh", width-200, height);
  frame=0;
  shape1done=false;
  shape2done=false;
  frame2=0;
  maxx=random(3, maxinit);
  maxx2=random(3, maxinit);
  diam=window.innerHeight/10;
  txtsize=window.innerHeight/10;
  e1x= [maxx];
  e1y=[maxx];
  e1d= [maxx];
  e2x= [maxx];
  e2y= [maxx];
  e2d= [maxx];
  mshapes=4;
  shape=0;

  if(random()<0.5){
    rx=random(500,width-width/4);
    ry=random(height/8,height-height/4);
  }else{
    rx=random(width/8,500);
    ry=random(200,height-height/8);
  }
  if(random()<0.5){
    r2x=random(rx+100,width-width/16);
    r2y=random(ry+100,height-height/16);
  }else{
    r2x=random(width/16,rx);
    r2y=random(ry,height-height/16);
  }

}

function mousePressed(){

  var mouseElsewhere=true;
  for(var i=0; i<frame; i++){
    if(dist(mouseX,mouseY,e1x[i],e1y[i]) < e1d[i]/2 && (mouseX>500||mouseY>180)  ){
      link="midterm/index.html"
      windowObjectReference = window.open(link, "yo", strWindowFeatures);
      mouseElsewhere=false;
    }
  }

  for(var i=0; i<frame2; i++){
    if(dist(mouseX,mouseY,e2x[i],e2y[i]) <e2d[i]/2&& (mouseX>500||mouseY>180) ){
      link="final/index.html"
      windowObjectReference = window.open(link, "yo", strWindowFeatures);
      mouseElsewhere=false;
      link="";
    }
  }

  if(mouseElsewhere){
    if(mouseX<width&&mouseX>0&&mouseY<height&&mouseY>0){
      update();
    }
  }

}
