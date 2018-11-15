var lastValue = [6];
var thisValue = [6];
var tick = 1000;
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function updateTime(){

  if(millis()>tick){
    tick+=1000;
    currentT[5]+=1;
    tellTime();
  }

  if(currentT[0]%4===0){
    daysInMonth[1] = 29;
  }
  else {
    daysInMonth[1] = 28;
  }


  if (currentT[5]>=60){
    currentT[4]+=1;
    currentT[5]=0;
    tellTime();
  }
  if (currentT[4]>=60){
    currentT[3]+=1;
    currentT[4]=0;
    tellTime();
  }
  if (currentT[3]>=24){
    currentT[2]+=1;
    currentT[3]=0;
    tellTime();
  }
  if (currentT[2]>=daysInMonth[currentT[1]-1]+1 ){
    currentT[1]+=1;
    currentT[2]=1;
    tellTime();
  }
if (currentT[1]===13){
  currentT[0]+=1;
  currentT[1]=1;
  tellTime();
}


if (currentT[5]<0){ currentT[4]-=1; currentT[5]=59; tellTime();
}
if (currentT[4]<0){ currentT[3]-=1; currentT[4]=59; tellTime();
}
if (currentT[3]<0){ currentT[2]-=1; currentT[3]=23; tellTime();
}

if (currentT[2]<=0){
  if(currentT[1] ===1 ){
    currentT[1]-=1;
    currentT[2]=daysInMonth[11];
    tellTime();
  }
  else {
      currentT[1]-=1;
      currentT[2]=daysInMonth[currentT[1]-1];
      tellTime();
  }
}

if (currentT[1]<1){
  currentT[0]-=1;
  currentT[1]=12;
  tellTime();
}

  currentT[2] = constrain( currentT[2], 0, daysInMonth[currentT[1]-1])

}
function doMore(){
  console.log("YOO");
}
