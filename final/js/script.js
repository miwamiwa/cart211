// objects
var drums;
var drums2;
var scale;
var sectionData;

// canvas
var canvas;
var divwidth, divheight;

// clock
var currentT = [6];
var frame=0;
var lastClockValue = []
var lastsection =0;
var currentSection;
var framesSinceSection;
var currentlyHovered=0;

// music
var rootNote =50;
var musicInc = 0;
var musicSpeed = 1;
var newPhrase = false;
var scaleToneWeight=0;
var passingToneWeight=0;
var moveUpWeight =0;
var moveDownWeight = 0;
var moveNotWeight =0;
var leapWeight =0;
var stepWeight =0;
var sectionLength = 300;
var currentMotion=0;

// images
var gearPic;
var gearObject0;
var gearObject1;
var gearObject2;
var gearObject3;
var gearObject4;
var gearObject5;

let soundStarted = false;

// preload()
//
// load images

function preload() {

  gearPic = loadImage("images/gear.png");
}

// setup()
//
// initialize settings on load.

function setup(){

  // load instruments
  drums = new Drum('sine');
  drums2 = new Drumz('white');
  setupInstruments();

  // load Sections object
  sectionData = new Sections(0.9*divheight, divwidth/2);
  // get time since start of piece
  setTime()

  // scale canvas
  var thisdiv = document.getElementById('sketch-holder');
  var divbox = thisdiv.getBoundingClientRect();
  divwidth = divbox.width;
  divheight =  divbox.height;
  canvas = createCanvas(divwidth, divheight);
  canvas.parent('sketch-holder');

  // load gears
  newGearObjects();
  displayGears();

  sectionData.x = divbox.width*0.5;
  sectionData.y = divbox.height*0.9;

  // update clock text
  tellTime();

  noLoop();
}

// draw()
//
// plays sound and runs clock mechanism

function draw(){

  // play sound
  playSound();
  // run clock
  updateTime();

  if(!soundStarted){
    push();
    fill(125, 0, 0);
    textSize(30);

     text("CLICK TO START SOUND", width/2, height*0.65);
  }

}

function mousePressed(){
  if(!soundStarted){
    soundStarted = true;
    drums.thisSynth.start();
    drums2.thisSynth.start();
    loop();
  }

}

// playsound()
//
// keep track of time, play each synthesizor.

function playSound(){

  // increment time
  if(!newPhrase){
    musicInc+=musicSpeed;
  } else {
    newPhrase=false;
  }

  // play each synth
  drums.handleDrums();
  drums2.handleDrums();
}

// displaygears()
//
// display background and gears.

function displayGears(){

  background(255);
  gearObject0.display();
  gearObject1.display();
  gearObject2.display();
  gearObject3.display();
  gearObject4.display();
  gearObject5.display();
  phrase.displayNotes();
  sectionData.update();
  sectionData.display();
}

// set gear size and position

function newGearObjects(){
  // bottom gears
  var gear0size = 250*divwidth/divheight;
  var gear1size = 250*divwidth/divheight;
  // left gears
  var gear2size = 200*divwidth/divheight;
  var gear3size = 200*divwidth/divheight;
  // right gears
  var gear4size = 250*divwidth/divheight;
  var gear5size = 200*divwidth/divheight;

  var gear0xpos = divwidth/2 - 0.15*divwidth;
  var gear1xpos = divwidth/2 + 0.15*divwidth;
  var gear2xpos = divwidth/2 - 0.15*divwidth;
  var gear3xpos = divwidth/2 - 0.4*divwidth;
  var gear4xpos = divwidth/2 + 0.13*divwidth;
  var gear5xpos = divwidth/2 + 0.41*divwidth;

  var gear0ypos = divheight/2 + 0.21*divheight;
  var gear1ypos = divheight/2 + 0.235*divheight;
  var gear2ypos = divheight/2 - 0.30*divheight;
  var gear3ypos = divheight/2 - 0.15 *divheight;
  var gear4ypos = divheight/2 - 0.21*divheight;
  var gear5ypos = divheight/2 - 0.105*divheight;

  gearObject0 = new Gear(gear0xpos, gear0ypos, 5, gear0size, gear0size);
  gearObject1 = new Gear(gear1xpos, gear1ypos, 4, gear1size, gear1size);
  gearObject2 = new Gear(gear2xpos, gear2ypos, 2, gear2size, gear2size);
  gearObject3 = new Gear(gear3xpos, gear3ypos, 3, gear3size, gear3size);
  gearObject4 = new Gear(gear4xpos, gear4ypos, 0, gear4size, gear4size);
  gearObject5 = new Gear(gear5xpos, gear5ypos, 1, gear5size, gear5size);
}

// resize canvas on page resize. greates new gear objects too.

function windowResized(){

  var thisdiv = document.getElementById('sketch-holder');
  var divbox = thisdiv.getBoundingClientRect();
  divwidth = divbox.width;
  divheight =  divbox.height;
  canvas = resizeCanvas(divwidth, divheight);
  sectionData = new Sections(0.9*divheight, divwidth/2);
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
  drums.setFilter("LP", 4000);
  // function(delayIsOn, length, feedback, filterFrequency)
  drums.setDelay(true, 0.12, 0.5, 800);
  drums.loadInstrument();

  drums2.setEnvelope(0.01, 0.03, 0.2, 0.8, 0.5, 0.0);
  drums2.setFilter("HP", 400);
  drums2.setDelay(false, 0.15, 0.6, 2000);
  drums2.loadInstrument();

  drums.setDivisions(40, 20, 10, 5, 2, 2, 2);
  drums.setWeights(18, 35, 30, 20, 5, 5, 5);
  // start sound
  drums.isPlaying = true;
  // setup instrument 2
  drums2.setDivisions(80, 40, 10, 5, 2, 4, 2);
  drums2.setWeights(40, 18, 25, 10, 8, 8, 3);
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



// mousewheel()
//
// scroll clock elements using mouse wheel

function mouseWheel(event) {

  // if one of the clock elements is hovered
  if(currentlyHovered!=0){

    // scroll clock element value up or down
    currentT[currentlyHovered-1] += event.delta/abs(event.delta);
    console.log(currentT[1]);
    if(currentT[1]<1){
      currentT[1]=12;
      currentT[0]-=1;
    }
    // update musicInc
    musicInc = framesSinceStart().totalFrames;
    tick = musicInc+60;
    // update clock text
    tellTime();

  }
  //uncomment to block page scrolling
  //return false;
}

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

function updateMenuInfo(){

}

// selecthoverarea()
//
// indicates which dial is hovered by mouse.

function selecthoverarea(x){
  currentlyHovered = x;
}
