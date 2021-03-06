var dayzInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var leapDay =0;
// time at which the piece started
var startTime = {
  year: 1969,
  month: 10,
  day: 29,
  hour: 22,
  minute: 30,
  second: 00,
  // 22:30 hours October 29, 1969
}
// setTime()
//
// called upon loading the page. gets the current time and
// sets the on screen clock
var phrase;
var musicInc=0;
var tick = musicInc+60;

function setTime(){

  // use Date() method to get time values
  var d = new Date();
  // split it up
  currentT[0] =  d.getFullYear();
  currentT[1] =  d.getMonth()+1;
  currentT[2] =  d.getDate();
  currentT[3] =  d.getHours();
  currentT[4] =  d.getMinutes();
  currentT[5] =  d.getSeconds();

  // update frame
  var info = framesSinceStart();

  musicInc = info.totalFrames;
  currentSection = info.currentSection;
  framesSinceSection = info.framesSinceSection;
  phrase = new Phrase(currentSection);
  tick = musicInc+60;

}



// adjustTime()
//
// called by clicking on-screen buttons.
// decreases or increases time values.
// includes a bunch of year and month-related exceptions, then the changes to
// apply if none of the exceptions are found.
// arguments: x = value added (or subtracted), y = which part of the clock.

// feels like the 2 last exceptions are repeated in tims.js??

function adjustTime(x, y){



  // get time value specified by argument y and add x (either 1 or -1)
  var newTime = parseInt(clockT[y].innerHTML, 10) + x;

  // Exceptions accounting for month length

  // if month is 12 and day is 31 and month is increased,
  if (y===1 && currentT[2] === 31 && currentT[1] === 12 && x>0){

    // months becomes 1
    currentT[1] = 1;
    // days becomes 31
    //currentT[2] = 31;
    // year is increased
    currentT[0] +=1;
  }

  // month is 1 and day is 31 and month is decreased,
  else if (y===1 && currentT[1] === 1 && x<0){
    console.log("HI")
    // month becomes 12
    currentT[1] = 12;
    // day becomes 31
    //	currentT[2] = 31;
    // year is decreased
    currentT[0] -=1;
  }

  // if month is decreased and date doesn't fit next month in line,
  // set the day to number of days in the next month.
  else if (y===1 && currentT[2] >= dayzInMonth[currentT[1]-2] && x===-1 ){

    currentT[1] = newTime;
    dayzInMonth[1] = 28;
    if(currentT[0]%4===0){
      dayzInMonth[1] = 29;
    }
    currentT[2] = dayzInMonth[currentT[1]-1];
  }

  // if month is increased and date doesn't fit next month in line,
  // set the day to number of days in the next month.
  else if (y===1 && currentT[2] >= dayzInMonth[currentT[1]] && x===1 ){

    currentT[1] = newTime;
    dayzInMonth[1] = 28;
    if(currentT[0]%4===0){
      dayzInMonth[1] = 29;
    }
    currentT[2] = dayzInMonth[currentT[1]-1];
  }

  // else if none of the exceptions above are found, update currently
  // selected time value.
  // also update frames
  else {
    console.log("new time "+newTime);
    // update time
    currentT[y] = newTime;

  }
  // update frame
  var info = framesSinceStart();
  musicInc = info.totalFrames;
  currentSection = info.currentSection;
  framesSinceSection = info.framesSinceSection;

  // reset/prevent clock tick
  tick = musicInc+60
  console.log("adjust time "+x+", "+y);
  // update clock text
  tellTime();
}



// tellTime()
//
// update the two text clocks on screen

function tellTime(){

  // update each clock element
  for (var i=0; i<6; i++){
    if(currentT[i]!=lastClockValue[i]){
      clockT[i].innerHTML = currentT[i];
      lastClockValue[i] = currentT[i];
    }
  }
  displayGears();
}

// menu display script
var displaythis = false;


// framesSinceStart()
//
// calculates time since "real" start of the piece
// returns current frame, current section and number of frames since
// start of section

function framesSinceStart(){

  // time since piece started
  var changeInTime = {
    year: currentT[0]-startTime.year,
    month: currentT[1]-startTime.month,
    day: currentT[2]-startTime.day,
    hour: currentT[3]-startTime.hour,
    minute: currentT[4]-startTime.minute,
    second: currentT[5]-startTime.second,
  }

  // convert change in months and years to number of days
  var monthToDays =0;
  dayzInMonth[1] = 28;
  if(currentT[0]%4===0){
    dayzInMonth[1] = 29;
  }
  if(startTime.month<currentT[1]){
    for (var i=startTime.month; i<currentT[1]; i++){
      monthToDays += dayzInMonth[i-1]
    }
  }
  else {
    for (var i=startTime.month; i>currentT[1]; i--){
      monthToDays -= dayzInMonth[i-2]
    }
  }

  var yearToDays =0;
  if(startTime.year<currentT[0]){
    for (var i=startTime.year; i<currentT[0]; i++){
      if(
        (i%4===0 &&  currentT[1] < 3)
        ||
        ((i+1)%4===0 &&  currentT[1] >= 3)
      ){
        yearToDays += 366;
      }
      else {
        yearToDays += 365;
      }
    }
  }
  else if(startTime.year>currentT[0]){
    for (var i=startTime.year; i>currentT[0]; i--){
      if(
        (i%4===0 &&  currentT[1] >= 3)
        ||
        ((i-1)%4===0 &&  currentT[1] < 3)
      ){
        yearToDays -= 366;
      }
      else {
        yearToDays -= 365;
      }
    }
  }

  // express changes in time in terms of frames
  var changeInFrames = [
    yearToDays*24*60*60*60,
    monthToDays*24*60*60*60,
    changeInTime.day*24*60*60*60,
    changeInTime.hour*60*60*60,
    changeInTime.minute*60*60,
    changeInTime.second*60
  ]
  // total up number of frames since "real" start of the piece
  var total = arraySum(changeInFrames, 0);

  // configure return
  var currentTime = {
    totalFrames: total,
    currentSection: floor(total / sectionLength),
    framesSinceSection: total%sectionLength,
  }
  return currentTime;
}

function getSection(frame){
  var currentTime = {
    currentFrame: frame,
    currentSection: floor(frame / sectionLength),
    framesSinceSection: frame%sectionLength,
  }
  if(frame<0){
    currentTime.framesSinceSection = sectionLength + currentTime.framesSinceSection;
  }
  return currentTime;
}
