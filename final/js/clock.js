  var dayzInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var leapDay =0;
// setTime()
//
// called upon loading the page. gets the current time and
// sets the on screen clock

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

  // get correct position within section
  //drums.catchUpSection();

// update clock text
  	tellTime();
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
  	currentT[2] = 31;
    // year is increased
  	currentT[0] +=1;
  }

  // month is 1 and day is 31 and month is decreased,
  else if (y===1 && currentT[2] === 31 && currentT[1] === 1 && x<0){
    // month becomes 12
  	currentT[1] = 12;
    // day becomes 31
  	currentT[2] = 31;
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

  // update time
 currentT[y] = newTime;

  }
  // update frame
  var info = framesSinceStart();
  musicInc = info.totalFrames;
  currentSection = info.currentSection;
  framesSinceSection = info.framesSinceSection;

  // get correct position within section
  //drums.catchUpSection();

 // reset/prevent clock tick
  tick = millis()+map(info.framesSinceSection,0, 60, 0, 1000 );
// update clock text
  tellTime();
  }

// tellTime()
//
// update the two text clocks on screen

  function tellTime(){

    // update each clock element
  	for (var i=0; i<6; i++){
  		clockT[i].innerHTML = currentT[i];
  	}

    // update string on top of the screen
  	timeInUse.innerHTML =
  	clockT[0].innerHTML + "-" +
  	clockT[1].innerHTML + "-" +
  	clockT[2].innerHTML + ", " +
  	clockT[3].innerHTML + ":" +
  	clockT[4].innerHTML + ":" +
  	clockT[5].innerHTML;
  }

  // menu display script
  var displaythis = false;

// showfunction()
//
// displays the menu by increasing opacity to 1

  function showFunction(){
  	document.getElementById("display_me").style.opacity = 1;
  displaythis = true;
  }

// hidefunction()
//
// hides the menu by decreasing opacity to 0

  function hideFunction(){
  	document.getElementById("display_me").style.opacity = 0;
  	displaythis = false;
  }

// toggleshowhide()
//
// toggles between menu display functions

  function toggleShowHide(){
  	 if(!displaythis){
  		 showFunction()
  	 }
  	 else {
  		 hideFunction()
  	 }
  }

// framesSinceStart()
//
// calculates time since "real" start of the piece
// returns current frame, current section and number of frames since
// start of section

  function framesSinceStart(){
    // time at which the piece started
    var startTime = {
      year: 2018,
      month: 5,
      day: 11,
      hour: 10,
      minute: 10,
      second: 10,
    }

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
    console.log("days passed: "+monthToDays);
    // total up number of frames since "real" start of the piece
    var total = arraySum(changeInFrames, 0);

    // configure return
    var currentTime = {
      totalFrames: total,
      currentSection: floor(total / sectionLength),
      framesSinceSection: total%sectionLength,
    }

    console.log(currentTime);
    return currentTime;
  }

  function getSection(frame){
    var currentTime = {
      currentFrame: frame,
      currentSection: floor(frame / sectionLength),
      framesSinceSection: frame%sectionLength,
    }
    return currentTime;
  }
