
var synth1;
var synth2;
var synth3;
var drum;
var sfx;

var musicInc = 0;
var musicSpeed = 1;

var rootNote=60;

var newPhrase=false;
var sectionSwitched=false;


function setup() {

  // create our playing area
  createCanvas(840,480);

  // load new instruments and set them up
  synth1 = new Synth('sine');
  synth2 = new Synth('square');
  synth3 = new Synth('square');
  sfx = new SFX('sine', 400);

  drums = new Drum('white');
  setupInstruments();

  //  setupMSections();


}
/*
function setupMSections(){
synth2.sections=[4, 4, 4];
}
*/

// draw()
//
// play sound,

function draw() {

  // play sound
  //handleMSections();
  playSound();


}

/*
function handleMSections(){
if(synth2.playedThru===synth2.sections[synth2.thisSection]&&!sectionSwitched){
synth2.thisSection+=1;
sectionSwitched=true;
switch(synth2.thisSection){
case 0: startNewPhrase(synth2, phrase1, 0, false); break;
case 1: startNewPhrase(synth2, phrase2, 0, false); break;
case 2: startNewPhrase(synth2, phrase3, 0, false); break;
case 3: synth2.thisSection=0; startNewPhrase(synth2, phrase1, 0, false); break;
}
}
}
*/

function keyPressed(){
  // prepare/reset FX

  // launch an FX
  switch(key){
    case "1": startSFX("up");  break;
    case "2": startSFX("down");  break;
    case "3": startSFX("trem");  break;
  }
}

function mousePressed(){
  if(mouseButton===LEFT){
    launchPart2();
  }
  if(mouseButton===RIGHT){
    launchPart1();
  }
}

function startSFX(sfxType){
  // prepare all SFX to allow new one to start
  sfx.upFX = false;
  sfx.downFX = false;
  sfx.tremFX = false;
  sfx.FXinc = 0;
  sfx.FXtimer = musicInc+ sfx.FXlength;
  sfx.baseFreq = sfx.defaultFreq;
  // launch the SFX
  switch(sfxType){
    case "up": sfx.upFX = true;  break;
    case "down": sfx.downFX = true; break;
    case "trem": sfx.tremFX = true; break;
  }
}

function startNewPhrase(synx, noteList, octave, rhythm, loop, fromTheTop){
  synx.playing=true;
  synx.notes=noteList;
  synx.phrase=noteList.length;
  synx.playedThru=0;
  synx.oct=octave;
  // set rate at which notes are played
  synx.rate=loop;


  if(rhythm===0){
    synx.rType="pulse";
    synx.rhythm=0;
  } else {
    synx.rType="array";
    synx.rhythm=rhythm;
    synx.nextNote=0;
  }
  if(fromTheTop){
    synx.loop=0;
  }
  newPhrase=true;
}

// playsound()
//
// keep time
// play individual instruments

function playSound(){
  if(!newPhrase){
    musicInc+=musicSpeed;
  } else {
    newPhrase=false;
  }

  drums.handleDrums();
  synth1.playMusic();
  synth2.playMusic();
  synth3.playMusic();
  sfx.playSFX();


}

// setupinstruments()
//
// here the values which will define the different
// instruments' sound are declared.

function setupInstruments(){

  // synth1 setup
  // envelope: function(attackTime, decayTime, releaseTime, attackLevel, susLevel, releaseLevel)
  synth1.setEnvelope(0.01, 0.4, 0.001, 0.4, 0.32, 0);
  // function(filterType, frequency)
  synth1.setFilter("LP", 400);
  // function(delayIsOn, length, feedback, filterFrequency)
  synth1.setDelay(true, 0.5, 0.55, 400)
  // function(noteList, octave, loopLength)

  // load it
  synth1.loadInstrument();


  // synth2 setup
  // envelope: function(attackTime, decayTime, releaseTime, attackLevel, susLevel, releaseLevel)
  synth2.setEnvelope(0.001, 0.5, 0.2, 0.8, 0.4, 0);
  // function(filterType, frequency)
  synth2.setFilter("LP", 1500);
  // function(delayIsOn, length, feedback, filterFrequency)
  synth2.setDelay(true, 0.33, 0.4, 2000)
  // function(noteList, octave, loopLength)


  // synth3 setup
  // envelope: function(attackTime, decayTime, releaseTime, attackLevel, susLevel, releaseLevel)
  synth3.setEnvelope(0.01, 0.7, 0.8, 0.3, 0.1, 0);
  // function(filterType, frequency)
  synth3.setFilter("LP", 800);
  // function(delayIsOn, length, feedback, filterFrequency)
  synth3.setDelay(true, 0.165, 0.3, 1500);
  // function(noteList, octave, loopLength)

  // load it




  // sfx setup
  // envelope: function(attackTime, decayTime, releaseTime, attackLevel, susLevel, releaseLevel)
  sfx.setEnvelope(0.001, 0.6, 0.0, 0.4, 0.4, 0);
  // function(filterType, frequency)
  sfx.setFilter("LP", 500);
  // function(delayIsOn, length, feedback, filterFrequency)
  sfx.setDelay(false, 0, 0, 0);
  // function(noteList, octave, loopLength)

  // load it


  // drum setup
  // envelope: function(attackTime, decayTime, releaseTime, attackLevel, susLevel, releaseLevel)
  drums.setEnvelope(0.005, 0.2, 0.2, 0.3, 0.1, 0.0);
  // function(filterType, frequency)
  drums.setFilter("BP", 400);
  // function(delayIsOn, length, feedback, filterFrequency)
  drums.setDelay(false, 0, 0, 0);
  //drums.setDivisions(bar, beat, subdiv, finediv, beatsperbar, divsperbeat, fineperdiv)



  // load it
  synth2.loadInstrument();
  synth3.loadInstrument();
  sfx.loadInstrument();
  drums.loadInstrument();

  launchPart0();

}

function launchPart1(){

  var phrase1=[-5, 5, 6, 7, 6, 5, 6, 7, 6, -7];
  var rhythm1=[60, 40, 20, 40, 20, 40, 20, 40, 120, 80];
  var phrase2=[3, 2, 3, 7, 3, 9, 3, 7, 3, 5, 7, 3, 3, 2, 3, 9, 3, 10, 3, 9, 3, 5, 7, 3];
  var phrase3=[0, 5, 0, 0, 5, 5, 0, 0, 8, 7, 0, 7];
  startNewPhrase(synth2, phrase1, 0, rhythm1, 30, true);
  startNewPhrase(synth1, phrase2, 12, 0, 60, true);
  startNewPhrase(synth3, phrase3, -24, 0, 120, true);
  drums.setDivisions(120, 60, 30, 10, 2, 2, 3);
  drums.setWeights(18, 27, 28, 10, 10, 8, 8);
  synth1.isPlaying = true;
  synth2.isPlaying = true;
  synth3.isPlaying = true;
  drums.isPlaying = true;
  newPhrase = true;
  musicInc = 0;
}
function launchPart0(){

  var phrase1=[-5, -7, 3, 5];
  var rhythm1=[20, 40, 30, 30];
  var phrase2=[3, 2, 3, 7, 3, 9, 3, 7, 3, 5, 7, 3, 3, 2, 3, 9, 3, 10, 3, 9, 3, 5, 7, 3];
  var phrase3=[0, 0, 0, -7];
  var rhythm2=[40, 10, 60, 10]
  startNewPhrase(synth2, phrase1, 0, rhythm1, 30, true);
  startNewPhrase(synth1, phrase2, 12, 0, 20, true);
  startNewPhrase(synth3, phrase3, -24, rhythm2, 30, true);
  drums.setDivisions(60, 20, 10, 5, 3, 2, 2);
  drums.setWeights(18, 27, 24, 10, 10, 2, 8);
  synth1.isPlaying = true;
  synth2.isPlaying = true;
  synth3.isPlaying = true;
  drums.isPlaying = true;
  newPhrase = true;
  musicInc = 0;
}
function launchPart2(){

  var phrase2=[3, 2, 3, 7, 3, 9, 3, 7, 3, 5, 7, 3, 3, 2, 3, 9, 3, 10, 3, 9, 3, 5, 7, 3];

  startNewPhrase(synth1, phrase2, 12, 0, 20, true);

  newPhrase = true;
  musicInc = 0;
  synth1.isPlaying = true;
  synth2.isPlaying = false;
  synth3.isPlaying = false;
  drums.isPlaying = false;
}
