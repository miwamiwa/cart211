  var dayzInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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

  // convert change in months to number of days
  var monthToDays =0;
if(startTime.month<currentT[1]){
  for (var i=startTime.month; i<currentT[1]; i++){
    monthToDays += dayzInMonth[i-1]
  }
}
else {
  for (var i=startTime.month; i>currentT[1]; i--){
    monthToDays += dayzInMonth[i-2]
  }
}

// account for leap years
var leapDays = floor(changeInTime.year/4);

// express changes in time in terms of frames
  var changeInFrames = [
    (changeInTime.year*365+leapDays)*24*60*60*60,
    monthToDays*24*60*60*60,
    changeInTime.day*24*60*60*60,
    changeInTime.hour*60*60*60,
    changeInTime.minute*60*60,
    changeInTime.second*60
  ]

  // total up number of frames since "real" start of the piece
  var totalFrames = arraySum(changeInFrames, 0);

  // assign to musicInc
  musicInc = totalFrames;

// update clock text
  	tellTime();
  }



// adjustTime()
//
// called by clicking on-screen buttons.
// decreases or increases time values.
// includes a bunch of month-related exceptions, then the changes to
// apply if none of the exceptions are found.
// arguments: x = value added (or subtracted), y = which part of the clock.

// feels like the 2 last exceptions are repeated in tims.js??

  function adjustTime(x, y){

// get time value specified by argument y and add x (either 1 or -1)
  var newTime = parseInt(clockT[y].innerHTML, 10) + x;

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
  	currentT[2] = dayzInMonth[currentT[1]-1];
  }

  // if month is increased and date doesn't fit next month in line,
  // set the day to number of days in the next month.
  else if (y===1 && currentT[2] >= dayzInMonth[currentT[1]] && x===1 ){
  	currentT[1] = newTime;
  	currentT[2] = dayzInMonth[currentT[1]-1];
  }

  // else if none of the exceptions above are found, update currently
  // selected month.
  else {
  currentT[y] = newTime;
  }
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
