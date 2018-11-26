/*
time.js handles our clock's mechanics: ticking seconds and subsequently
increasing minutes when seconds reach their max/min limit, on their own
or caused by user input. same for minutes, hours, days, months, years.
*/

// first trigger that will cause seconds to tick (ms value)
var tick = musicInc+60;
// an array containing number of days in each month of the year
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// updatetime()
//
// makes the clock time over time.
// also increases or decreases value of one clock section
// when another reaches its maximum or minimum value.
// reacts to user input as well as to the clock's ticking.

function updateTime(){

  //////// HANDLE UPDATING SECONDS

// increase seconds by 1 for every 1000 ms that the sketch has been running.

  if(musicInc>tick){
    // set next trigger
    tick = musicInc+60;
    // update seconds
    currentT[5]+=1;
    // update clock text (clock.js)
    tellTime();
  }

  ///////// HANDLE CLOCKWORK

// set number of days in february according to leap years
  if(currentT[0]%4===0){
    daysInMonth[1] = 29;
  }
  else {
    daysInMonth[1] = 28;
  }

// if seconds reach 60, increase minutes by 1
  if (currentT[5]>=60){
    currentT[4]+=1;
    // reset seconds
    currentT[5]=0;
    // update clock text
    tellTime();
  }

// if minutes reach 60, increase hours by 1
  if (currentT[4]>=60){
    currentT[3]+=1;
    // reset minutes
    currentT[4]=0;
    // update clock text
    tellTime();
  }

  // if hours reach 24, increase days by 1
  if (currentT[3]>=24){
    currentT[2]+=1;
    // reset hours
    currentT[3]=0;
    // update clock text
    tellTime();
  }

  // if days reach number of days in a month, increase months by 1
  if (currentT[2]>=daysInMonth[currentT[1]-1]+1 ){
    currentT[1]+=1;
    // reset days
    currentT[2]=1;
    // update clock text
    tellTime();
  }

  // if months excede 12, increase years by 1
if (currentT[1]===13){
  currentT[0]+=1;
  // reset months
  currentT[1]=1;
  // update clock text
  tellTime();
}

// if seconds fall below 0, decrease minutes by 1
if (currentT[5]<0){
  currentT[4]-=1;
  // reset seconds
  currentT[5]=59;
  // update clock text
  tellTime();
}

// if minutes fall below 0, decrease hours by 1
if (currentT[4]<0){
  currentT[3]-=1;
  // reset minutes
  currentT[4]=59;
    // update clock text
  tellTime();
}

// if hours fall below 0, decrease days by 1
if (currentT[3]<0){
  currentT[2]-=1;
// reset hours
  currentT[3]=23;
// update clock text
  tellTime();
}

// if days reach 0, decrease month by 1,
// and reset days to number of days in the new month.
if (currentT[2]<=0){
  // if the previous month was the first month,
  if(currentT[1] ===1 ){
    // decrease months by 1
    currentT[1]-=1;
    // now the month is the last one.
    currentT[2]=daysInMonth[11];
      // update clock text
    tellTime();
  }
  // if the previous month is any month other than the first
  else {
    // decrease months by 1
      currentT[1]-=1;
      // set number of days to number of days in new month.
      currentT[2]=daysInMonth[currentT[1]-1];
      tellTime();
  }
}

// if months reach 0, decrease years by 1
if (currentT[1]<1){
  currentT[0]-=1;
  // reset months
  currentT[1]=12;
  // update clock text
  tellTime();
}

// constrain days to month boundaries in case user increased months while
// days were set to 31 (31 might not be a valid date in the next month)

  currentT[2] = constrain( currentT[2], 0, daysInMonth[currentT[1]-1])

}
