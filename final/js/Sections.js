/*
This script handles updating all the variable structural settings.
Here is also where the on screen display of settings is done.
*/

function Sections(y, x){

  this.x = x;
  this.y = y;
  this.stepweight =0;
  this.leapweight =0;
  this.ni1weight =0;
  this.ni2weight =0;
  this.ni3weight =0;
  this.ni4weight =0;
  this.ni5weight =0;
  this.ni6weight =0;
  this.minint =0;
  this.maxint = 0;
  this.section =0;
  this.frame =0;
  this.scaleNum =0;
  this.chosenDir =0;
  this.chosenInt =0;
  this.chosenLeapOrStep =0;
  this.chosenNextNote =0;

}

// display the graphic elements at the bottom of the screen.
// set text, position and colour of showInfo() elements.

Sections.prototype.display = function(){

  textAlign(CENTER);
  rectMode(CENTER);

  var yellow = color(166, 193, 191);
  var green = color(173, 148, 133);
  var orange = color(101, 122, 120);
  var yellow2 = color(114, 88, 72);
  var nothing = color(0, 0, 220, 0);
  var empty = " ";
  var x20 = -width*0.43;
  var y20 = -height/32;
  var x21 = x20+width/32;
  var y21 = -height/8;

  this.showInfo("             frame              ", this.frame, x21, y21, x20-x21, y20-y21, yellow, orange);
  this.showInfo("         section         ", this.section, x20, y20, x1-x20, y1-y21, yellow, orange);

  // scale
  var x2 = -width*0.27;
  var y2 = -height/32;
  var x1 = x2+width*0.05;
  var y1 = -height/8;
  var x3 = x1+width*0.02;
  var y3 = -height/32;
  var x4 = x3+width*0.02;
  var y4 = +height/16;

  this.showInfo("   minimum   ", 1+this.minint, x3, y4, x2-x3, y2-y4, yellow, orange);
  this.showInfo("   maximum   ", 2+this.maxint, x4, y3,x2-x4, y2-y3, yellow, orange);
  this.showInfo("     scale index:     ", this.scaleNum, x1, y1, x2-x1, y2-y1, yellow, orange);
  this.showInfo("possible scale\nintervals", empty, x2, y2, 0, 0, yellow, orange);

  var leapstep1 = yellow;
  var leapstep2 = yellow;
  var leapstep1a = orange;
  var leapstep2a = orange;

  if(this.chosenLeapOrStep==="leap"){
    leapstep1 = green;
    leapstep1a = yellow2
  }

  else if(this.chosenLeapOrStep==="step"){
    leapstep2 = green;
    leapstep2a = yellow2
  }

  var x5 = 0-width*0.07;
  var y5 = -1*height/32;

  var leapx = x5-width*0.03;
  var leapx2 = leapx;
  var leapy = -height/8;
  var leapy2 = +height/16;

  this.showInfo("  favor step motion  ", this.stepweight, leapx2, leapy2, x5-leapx2, y5-leapy2, leapstep2, leapstep2a);
  this.showInfo("  favor leap motion  ", this.leapweight, leapx, leapy, x5-leapx, y5-leapy, leapstep1, leapstep1a);

  var leap1 = yellow;
  var leap2 = yellow;
  var leap3 = yellow;
  var leap4 = yellow;
  var leap5 = yellow;
  var leap6 = yellow;
  var leap1b = orange;
  var leap2b = orange;
  var leap3b = orange;
  var leap4b = orange;
  var leap5b = orange;
  var leap6b = orange;

  if(this.chosenInt === 2 || this.chosenInt ===1){
    leap1 = green;
    leap1b = yellow2;
  }
  else if(this.chosenInt === 3){
    leap2 = green;
    leap2b = yellow2;
  }
  else if(this.chosenInt === 4){
    leap3 = green;
    leap3b = yellow2;
  }
  else if(this.chosenInt === 5){
    leap4 = green;
    leap4b = yellow2;
  }
  else if(this.chosenInt === 6){
    leap5 = green;
    leap5b = yellow2;
  }
  else if(this.chosenInt === 7){
    leap6 = green;
    leap6b = yellow2;
  }

  var x6 = x5+width/16;
  var y6 = -height/8;
  var x7 = x6+width/16;
  var y7 = y6;
  var y8 = -height/32;
  var x8 = x6+width/32;
  var x9 = x7+width/32;
  var x10 = x6;
  var x11 = x7;
  var y11 = +height/16;

  this.showInfo("  third  ", this.ni2weight, x7, y7, x5-x7, y5-y7, leap2, leap2b);
  this.showInfo("  seventh  ", this.ni6weight, x11, y11,  x5-x11, y5-y11, leap6, leap6b);
  this.showInfo("  fifth  ", this.ni4weight, x9, y8,  x5-x9, y5-y8, leap4, leap4b);
  this.showInfo("  sixth  ", this.ni5weight, x10, y11, x5-x10, y5-y11, leap5, leap5b);
  this.showInfo("  fourth  ", this.ni3weight, x8, y8, x5-x8, y5-y8, leap3, leap3b);
  this.showInfo("  step  ", this.ni1weight, x6, y6, x5-x6, y5-y6, leap1, leap1b);
  this.showInfo("chosen\ninterval", empty, x5,y5, 0, 0, yellow, orange);

  var x12 = x11+width/12;
  var y12 = -height/8;
  var x13 = x12+width/32;
  var y13 =-height/32;
  var x14 = x13+width/32 ;
  var y14 = y12;
  var x15 = x14+width/32;
  var y15 = y13;
  var lenx = x14-width/32;
  var leny = height/16;

  this.showInfo("    bar    ", drums.bar, x12, y12, lenx-x12, leny-y12, yellow, orange);
  this.showInfo("  subdiv  ", drums.subdiv, x14, y14, lenx-x14, leny-y14, yellow, orange);
  this.showInfo("  finediv  ", drums.finediv,x15, y15,lenx-x15, leny-y15, yellow, orange);
  this.showInfo("   beat   ", drums.beat, x13, y13,     lenx-x13, leny-y13, yellow, orange);
  this.showInfo("division\nlength", empty, lenx, leny, 0, 0, yellow, orange)

  var measure1 = yellow;
  var measure2 = yellow;
  var measure3 = yellow;
  var measure4 = yellow;
  var measure1b = orange;
  var measure2b = orange;
  var measure3b = orange;
  var measure4b = orange;

  if(musicInc%drums.bar===0){
    measure1 = green;
    measure1b = yellow2;
  }
  else if( musicInc%drums.beat===0){
    measure2 = green;
    measure2b = yellow2;
  }
  else if( musicInc%drums.subdiv===0){
    measure3 = green;
    measure3b = yellow2;
  }
  else if( musicInc%drums.finediv===0){
    measure4 = green;
    measure4b = yellow2;
  }

  var x16 = x15+width/5;
  var y16 = -height/8;
  var x17 = x16;
  var y17 = height/16;
  var x18 = x17+width/24;
  var y18 = y16;
  var x19 = x16+width/24;
  var y19 = y17;
  var trigx = x15+width/6;
  var trigy = -height/32;

  this.showInfo("  bar  ", drums.barweight, x16, y16, trigx-x16, trigy-y16, measure1, measure1b);
  this.showInfo("  beat  ", drums.beatweight, x17, y17, trigx-x17, trigy-y17, measure2, measure2b);
  this.showInfo("  sub  ", drums.subweight,   x18, y18, trigx-x18, trigy-y18, measure3, measure3b);
  this.showInfo("  fine  ", drums.fineweight, x19, y19, trigx-x19, trigy-y19, measure4, measure4b);

  var x22 = x15+width/12;
  var y22 = -height/8
  var y23 = height/16;
  this.showInfo("   max stimulus   ", drums.stimulusScale, x22, y22, trigx-x22, trigy-y22, yellow, orange);
  this.showInfo("   play threshold   ", drums.thresh, x22, y23, trigx-x22, trigy-y23, yellow, orange);
  this.showInfo("chance to\ntrigger", empty, trigx, trigy, 0, 0, yellow, orange)

}

// showinfo()
// a function that displays a rounded rectangle with data, information and
// a connecting line.

Sections.prototype.showInfo = function(disptext, value, xpos, ypos, linex, liney, color, color2){

  var textsize=13;
  textSize(textsize);
  textFont('Gabriela');
  stroke(color);
  strokeWeight(3);
  fill(color);
  var xtranslate = xpos+this.x;
  var ytranslate = ypos+this.y;
  line(xtranslate, ytranslate, xtranslate+linex, ytranslate+liney);
  stroke(color2, 125);
  strokeWeight(5);
  rect(xtranslate, ytranslate-2*textsize/8, disptext.length*textsize/2, textsize*3.3, width/32);
  noStroke();
  fill(0);
  text(disptext, 1+xtranslate, -textsize/2-1+ytranslate);
  textSize(textsize+10);
  fill(13, 40, 38);
  text(value, 1+xtranslate, (textsize+15)/2-1+ytranslate);

}

// update()
// update all the variable settings

Sections.prototype.update = function(){

  this.section = getSection(musicInc).currentSection;
  this.frame = musicInc;
  this.scaleNum = floor(this.section/400);
  if(currentMotion!=0){
    this.chosenDir =currentMotion.direction;
    this.chosenInt =currentMotion.interval;
    this.chosenLeapOrStep =currentMotion.leapOrStep;
    this.chosenNextNote =currentMotion.nextNote;
  }
  this.minint = floor(map(cos(this.section*0.00000021), -1, 1, 0, 4));
  this.maxint = floor(map(sin(this.section*0.0000003-0.3*PI), -1, 1, 0, 7-this.minint));
  this.ni1weight = floor(map(-cos(this.section*0.0000012), -1, 1, 1, 10));
  this.ni2weight =   floor(map(-cos(this.section*0.0000013), -1, 1, 1, 10));
  this.ni3weight = floor(map(-cos(this.section*0.0000014), -1, 1, 1, 10));
  this.ni4weight =floor(map(-cos(this.section*0.0000015), -1, 1, 1, 10));
  this.ni5weight =floor(map(-cos(this.section*0.0000016), -1, 1, 1, 10));
  this.ni6weight =floor(map(-cos(this.section*0.0000017), -1, 1, 1, 10));
  this.leapweight = floor(map(-cos(this.section*0.003), -1, 1, 1, 10));
  this.stepweight = floor(map(cos(this.section*0.0011), -1, 1, 1, 10));
  drums.barweight = floor(map(-cos(this.section*0.1), -1, 1, 1, 10));
  drums.beatweight = floor(map(-cos(this.section*0.05), -1, 1, 1, 10));
  drums.subweight = floor(map(-cos(this.section*0.08), -1, 1, 1, 10));
  drums.fineweight = floor(map(-cos(this.section*0.2), -1, 1, 1, 10));
  drums.stimulusScale = floor(map(-cos(this.section*0.03), -1, 1, 20, 50));
  drums.bar = floor(map(sin(this.section*0.0001), -1, 1, 60, 150));
  drums.beat = floor(map(sin(this.section*0.0002), -1, 1, 30, 45));
  drums.subdiv = floor(map(sin(this.section*0.0003), -1, 1, 15, 30));
  drums.finediv = floor(map(sin(this.section*0.0004), -1, 1, 3, 10));
  drums.divperbar = floor(drums.bar/drums.beat)
  drums.divperbeat = floor(drums.beat/drums.subdiv)
  drums.divpersub = floor(drums.subdiv/drums.finediv)
  drums.thresh = floor(map(-cos(this.section*0.04), -1, 1, 20, 40));
  drums2.thresh = drums.thresh;
  drums2.bar = drums.bar;
  drums2.beat = drums.beat;
  drums2.subdiv = drums.subdiv;
  drums2.finediv = drums.finediv;
  drums2.divperbar = drums.divperbar;
  drums2.divperbeat = drums.divperbeat;
  drums2.divpersub = drums.divpersub;
  drums2.barweight = drums.barweight;
  drums2.beatweight = drums.beatweight;
  drums2.subweight = drums.subweightweight;
  drums2.fineweight = drums.fineweight;
  drums2.stimulusScale = drums.stimulusScale;
}
