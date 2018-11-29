
var generating=true;
var frame=0;
var scale;


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

var divwidth, divheight;
var pos=[6];

var   currentSection;
var  framesSinceSection;
var lastClockValue = []

var gearPic;
var gearObject0;
var gearObject1;
var gearObject2;
var gearObject3;
var gearObject4;
var gearObject5;
var lastsection;

function preload() {

  // load images
  gearPic = loadImage("images/gear.png");
}

// setup()
//
// creates p5.sound.js objects

function setup(){

  var thisdiv = document.getElementById('sketch-holder');
  var divbox = thisdiv.getBoundingClientRect();
  //  console.log(divbox);
  divwidth = divbox.width;
  divheight =  divbox.height;
  // create "canvas"
  canvas = createCanvas(divwidth, divheight);
  canvas.parent('sketch-holder');

  // create p5.sound.js objects
  drums = new Drum('square');
  drums2 = new Drumz('white');

  // instrument and music setup
  setupInstruments();
  launchPart0();
  newGearObjects();
  displayGears();

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
  drums.handleDrums();
  drums2.handleDrums();

}

function displayGears(){
  background(255);
  phrase.displayNotes();
  gearObject0.display();
  gearObject1.display();
  gearObject2.display();
  gearObject3.display();
  gearObject4.display();
  gearObject5.display();
}

function newGearObjects(){

  var gear0size = 0.3*height;
  var gear1size = 0.65*height;
  var gear2size = 0.4*height;
  var gear3size = 0.2*height;
  var gear4size = 0.44*height;
  var gear5size = 0.23*height;
  gearObject0 = new Gear(0.42*width, 0.98*height, 5, gear0size, gear0size);
  gearObject1 = new Gear(0.615*width, 1.13*height, 4,gear1size, gear1size);
  gearObject2 = new Gear(0.035*width, 0.05*height, 2, gear2size, gear2size);
  gearObject3 = new Gear(0.01*width, 0.320*height, 3, gear3size, gear3size);
  gearObject4 = new Gear(0.965*width, 0.04*height, 0, gear4size, gear4size);
  gearObject5 = new Gear(0.99*width, 0.34*height, 1, gear5size, gear5size);
}

function windowResized(){

  var thisdiv = document.getElementById('sketch-holder');
  var divbox = thisdiv.getBoundingClientRect();
  //  console.log(divbox);
  divwidth = divbox.width;
  divheight =  divbox.height;
  // create "canvas"
  canvas = resizeCanvas(divwidth, divheight);
  newGearObjects();

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
  drums.setFilter("LP", 2500);
  // function(delayIsOn, length, feedback, filterFrequency)
  drums.setDelay(true, 0.12, 0.4, 1000);
  drums.loadInstrument();

  drums2.setEnvelope(0.01, 0.03, 0.2, 0.8, 0.5, 0.0);
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
  drums.setDivisions(40, 20, 10, 5, 2, 2, 2);
  drums.setWeights(18, 35, 30, 20, 5, 5, 5);
  // start sound
  drums.isPlaying = true;

  // setup instrument 2
  drums2.setDivisions(80, 40, 10, 5, 2, 4, 2);
  drums2.setWeights(40, 14, 20, 7, 2, 8, 1);
  // start sound
  drums2.isPlaying = true;

  // reset time
  newPhrase = true;

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
    tick = musicInc+60;
    // update clock text
    tellTime();

  }
  //uncomment to block page scrolling
  //return false;
}
