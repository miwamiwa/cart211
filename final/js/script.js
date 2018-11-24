var musicInc=0;
var generating=true;
var frame=0;
var scale;
var phrase;

var drums;
var drums2;
var rootNote =50;
// weights

var scaleToneWeight=0;
var passingToneWeight=0;

var moveUpWeight =0;
var moveDownWeight = 0;
var moveNotWeight =0;
var leapWeight =0;
var stepWeight =0;

var musicInc = 0;
var musicSpeed = 1;
var newPhrase = false;

var canvas;


var sectionLength = 300;


var pos=[6];

// setup()
//
// creates p5.sound.js objects

function setup(){

  // create "canvas"
  canvas = createCanvas(0, 0);

  // create p5.sound.js objects
  phrase = new Phrase();
  drums = new Drum('square');
  drums2 = new Drumz('white');

  // instrument and music setup
  setupInstruments();
  launchPart0();

}

// draw()
//
// plays sound and runs clock mechanism

function draw(){

  // play sound
  playSound();
  // run clock
  updateTime();

}

// playsound()
//
// keep track of time, play each synthesizor.

function playSound(){

  // increment time (frames)
  if(!newPhrase){
   musicInc+=musicSpeed;
  //  console.log("musicInc: "+musicInc)
  } else {
    newPhrase=false;
  }

  // play each synth
//  drums.handleDrums();
//  drums2.handleDrums();

}

// setupinstruments()
//
// setup the sound characteristics of each instrument
// set envelope, filter and delay then load the instrument

function setupInstruments(){
  // drum setup
  // envelope: function(attackTime, decayTime, releaseTime, attackLevel, susLevel, releaseLevel)
  drums.setEnvelope(0.01, 0.4, 0.8, 0.5, 0.2, 0.0);
  // function(filterType, frequency)
  drums.setFilter("BP", 800);
  // function(delayIsOn, length, feedback, filterFrequency)
  drums.setDelay(true, 0.1, 0.2, 1000);
  drums.loadInstrument();

  drums2.setEnvelope(0.01, 0.1, 0.4, 0.5, 0.2, 0.0);
  drums2.setFilter("BP", 400);
  drums2.setDelay(false, 0.15, 0.6, 2000);
  drums2.loadInstrument();
}

// launchpart0()
//
// gives each instrument initial rhythmic weights and sets
// their rhythmic divisions. starts sound and resets time.

function launchPart0(){

  // setup instrument 1
  drums.setDivisions(40, 120, 40, 20, 2, 3, 2);
  drums.setWeights(18, 30, 24, 1, 5, 5, 10);
  // start sound
  drums.isPlaying = true;

  // setup instrument 2
  drums2.setDivisions(120, 40, 10, 5, 3, 4, 2);
  drums2.setWeights(30, 28, 20, 5, 15, 10, 2);
  // start sound
  drums2.isPlaying = true;

  // reset time
  newPhrase = true;
  musicInc = 0;
}

// removeitem()
//
// remove a given item from its array and shorten the array

function removeItem(array, item){

  // get initial array length
  var length = array.length;

  // if array isn't empty
  if(length!=0){

    // if selected item is last on the list
    if(item===length-1){

      // shorten array by 1
      array = shorten(array);
    }
    // if it's in any other position on the list
    else {
      // split and reglue array
      var partone = array.slice(0, item);
      var parttwo = array.slice(item+1, length+1);
      array = partone.concat(parttwo);
    }
  }
  // return the new array
  return array;
}

// arraySum()
//
// add the values of each element in an array until a specified value.

function arraySum(array, end){

  // get array length
  var length = array.length;
  var sum = 0;

  // if "end" is 0, add together all the elements in the array
  if (end===0){
    for (var i=0; i<length; i++){
      sum+= array[i];
    }
  }

  // if end is declared, add together everything until the given end
  else {
    for (var i=0; i<end+1; i++){
      sum+= array[i];
    }
  }
  // return the sum of values in the array
  return sum;
}

// checkforempties()
//
// check for empty slots in the array, remove those items.

function checkForEmpties(array){
  for(var i=0; i<array.length; i++){
    if(array[i]===""){
      array = removeItem(this.array, i);
    }
  }
}

// mousewheel()
//
// scroll clock elements using mouse wheel

function mouseWheel(event) {

  // if one of the clock elements is hovered
  if(currentlyHovered!=0){

    // scroll clock element value up or down
    currentT[currentlyHovered-1] += event.delta/abs(event.delta);
    // update musicInc
    musicInc = framesSinceStart().totalFrames;
    // update clock text
    tellTime();

  }
  //uncomment to block page scrolling
  //return false;
}
