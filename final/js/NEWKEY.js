//MUSIC
// the music related code in here is mostly copy-pasted from project 1.
// this time around the composition is not random, the following three
// synths read through set parts at set rhythms.


var drum={ //noise drum
  // declare type of synth, and type of filter
  synthType: 'white',
  filtAtt: "BP",
  // same basic parameters as syn1
  attackLevel: 1.2,
  releaseLevel: 0,
  attackTime: 0.001,
  decayTime: 0.05,
  susPercent: 0.7,
  releaseTime: 0.001,
  env: 0,
  thisSynth: 0,
  filter: 0,
  fFreq: 400,
  // values used to constrain random filter frequency
  filterMin: 1000,
  filterMax: 4500,
  // a parameter to trigger drums on and off
  playing: true,
  // parameters for trigger timing
  trig: 0,
  nextTrig: 200,
  // drums "on" duration
  trigOn: 400,
  // drums "off" duration
  trigOff: 80,
  // state no delay
  delayFX: false,
  playing:false,
  playedThru:0,
  sections:[0],
  thisSection:0,
}




var beat= 40;

var strongbeatdivision=2;
var strongsubdivision=2;

var divperbar=4;
var divperbeat=4;
var divpersub=2;

var barperphrase=1;
var phrasepersection=1;

var bar=beat*divperbar;
var subdiv=beat/divperbeat;
var finediv=subdiv/divpersub;

var barweight=1;
var beatweight=12;
var subweight=4;
var fineweight=1;

var strongbeatweight=8;
var strongsubweight=2;

var phrase=0;
var section=0;
var currentbeat=0;
var currentsub=0;

var maxWeight=barweight+beatweight+subweight+fineweight+strongbeatweight+strongsubweight;
var stimulusScale=1.5*maxWeight;
var thresh=0.25*(maxWeight+stimulusScale);
var noiseInc = 0.11;
var maxloudness=2;


var firstFrame=false;
var time=0;


var lastWidth=0;
var lastHeight=0;
var bgcolor=145;
var efill=0;
var canvas;

  var kNoiseInc = 0;

function setup(){
  console.log("yoooo")
  canvas=  createCanvas(window.innerWidth, window.innerHeight);

  background(bgcolor);
  noStroke();
  frameRate(40);

  setupInstruments();
  firstFrame=true;
  phrase=0;
  currentbeat=0;
  currentsub=0;
  noiseDetail(5,0.1);
  //section=random(1000);
  section=2000000;
  canvas.parent('sketch-holder');
}

function setupInstruments(){
  loadAnInstrument(drum);
}


function draw(){

  if(lastWidth!=window.innerWidth||lastHeight!=window.innerHeight){update();}
  handleMusic();

}



function handleMusic(){
  time+=1;
  if(firstFrame){
    time=0;
    firstFrame=false;
  }
  handleDrums();
}



function handleDrums(){

  var weight = salience(time);

  noiseSeed(section);
  var stimulus = noise(time*noiseInc)*stimulusScale;
  if(stimulus+weight>thresh&&weight!=0){
    var loudness = map(stimulus+weight, 0, stimulusScale+maxWeight, 0, 2);
    loudness = constrain(loudness, 0, 1);
  //  console.log("stimulus: "+stimulus);
  //  console.log("loudness: "+loudness);
    drum.filter.freq( 18150-loudness*18000 );
    drum.env.setADSR(drum.attackTime, drum.decayTime, 0.8*loudness, drum.releaseTime);
    drum.env.setRange(loudness, drum.releaseLevel);
    drum.env.play();
  }

  if(phrase>=phrasepersection){
    section+=1;
    phrase=0;
    console.log("section :"+section);
    noiseSeed(section);
  }

  if(time>=bar*barperphrase){
    time=0;
    firstFrame=true;
    phrase+=1;
  }


}

function salience(t){
  if(time%beat===0){
    currentbeat+=1;
    if(currentbeat>divperbar){
      currentbeat=0;
    }
  }
  if(time%subdiv===0){
    currentsub+=1;
    if(currentbeat>divperbeat){
      currentsub=0;
    }
  }

  var factor=0;
  if(t%bar===0){
    factor+=barweight;
  }
  if(t%beat===0){
    var addweight=0;
    if(currentbeat%strongbeatdivision!=0){
      addweight=strongbeatweight;
    }
    factor+=beatweight+addweight;
  }
  if(t%subdiv===0){
    var addmoreweight=0;
    if(currentsub%strongsubdivision!=0){
      addmoreweight=strongsubweight;
    }
    factor+=subweight;
  }
  if(t%finediv===0){
    factor+=fineweight;
  }
  return factor;
}

function loadAnInstrument(synx){
  // for any instrument namedm synx (syn1, syn2, syn3 or syn4)
  // load envelope
  synx.env=new p5.Env();
  // setup envelope parameters
  synx.env.setADSR(synx.attackTime, synx.decayTime, synx.susPercent, synx.releaseTime);
  synx.env.setRange(synx.attackLevel, synx.releaseLevel);
  // check which filter to use
  if(synx.filtAtt==="BP"){
    // if the filter attribute says BP load a band pass filter
    synx.filter= new p5.BandPass();
  }
  // if the filter attribute says LP load a low pass filter
  if(synx.filtAtt==="LP"){
    synx.filter=new p5.HighPass();
  }
  // set initial filter frequency
  synx.filter.freq(synx.fFreq);
  // now load the type of oscillator used. syn3 is the only one which uses
  // something else than the standard oscillator, so this exception is dealt with first:
  // if the synth type is "pink" then we have a noise synth.
  if(synx.synthType==='pink'||synx.synthType==='white'){
    synx.thisSynth=new p5.Noise(synx.synthType);
    // if anything else (square or sine) then we have an oscillator
  } else {
    synx.thisSynth=new p5.Oscillator(synx.synthType);
  }
  // plug-in the amp, which will be monitored using the envelope (env) object
  synx.thisSynth.amp(synx.env);
  // disconnect this sound from audio output
  synx.thisSynth.disconnect();
  // reconnect it with the filter this time
  synx.thisSynth.connect(synx.filter);
  // start audio
  synx.thisSynth.start();
  // set the initial frequency. do not set if this is the noise drum.
  if(synx.synthType!='pink'&&synx.synthType!='white'){synx.thisSynth.freq(rootNote);
  }
  // if delayFX is true, then there is also a delay object to load
  if(synx.delayFX){
    synx.delay = new p5.Delay();
    synx.delay.process(synx.thisSynth, synx.delayLength, synx.delayFB, synx.delayFilter);
  }
}
function mousePressed(){
  noStroke();
  fill(efill);
  ellipse(mouseX, mouseY, 100, 100);

}
function mouseDragged(){
  noStroke();
  fill(efill);
  ellipse(mouseX, mouseY, 300, 300);

}
function update(){
  lastWidth=window.innerWidth;
  lastHeight=window.innerHeight;
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(bgcolor);
  canvas.parent('sketch-holder');

}
function keyPressed(){
  switch(key){
    case "1": efill=color(227, 242, 240); break;
    case "2": efill=color(166, 193, 191);  break;
    case "3": efill=color(101, 122, 120); break;
    case "4": efill=color(13, 40, 38); break;
    case "5": efill=color(5, 15, 14); break;
    case "6": efill=color(193, 176, 166); break;
    case "7": efill=color(173, 148, 133); break;
    case "8": efill=color(114, 88, 72); break;
    case "9": efill=color(81, 58, 44); break;
    case "0": newKey(); break;

  }
}

// newkey()
//
// generates a new random key
// keys are made up of random intervals stacked together until a multiple of 12 (an octave) is reached.
// possible intervals are the ones contained within the max and min boundaries.
// based on that max patch i made for a class a while ago that generated random keys..

function newKey(){

  var minInterval = 1;
  var maxInterval = 2;

  var totalInterval = 0;
  var kNoiseRate = 1;
  var kNoiseSeed = 3;
  var key = [];
  var stopGenerating = false;
  var keyOctaveSpan = 0;
    console.log("new key");
    noiseSeed(kNoiseSeed);

  while(!stopGenerating){

    kNoiseInc += kNoiseRate;

    var thisInterval = 0;
    var noteChoice =0;
    var possibleIntervals = maxInterval - minInterval + 1;

    var noiseResult = noise(kNoiseInc)*2;
    var noiseSec = 1/possibleIntervals;

    console.log("noiseResult: "+noiseResult);

    // the following for() loop makes a choice using noiseResult
    for (var i=0; i< possibleIntervals; i++){
      if(noiseResult > i*noiseSec && noiseResult < (i+1)*noiseSec){
        noteChoice = i;
      }
    }
    // interval value for this note
    thisInterval = minInterval + noteChoice;
    // add that to total count
    totalInterval += thisInterval;
    // add note to array
    key.push(thisInterval);
    // if total count reaches an octave, stop generating.
    if(totalInterval%12===0&&totalInterval!=0){
      stopGenerating = true;
      keyOctaveSpan = totalInterval/12;
    }
  }
  // print results
  console.log("keyOctaveSpan :"+keyOctaveSpan);
  console.log("key: ")
  console.log(key);
}
