
// starting key midi value
var rootNote=60;

function Drum(oscType){
  // declare type of synth; and type of filter
  this.synthType= oscType;
  this.filtAtt= "LP";
  this.isPlaying = false;
  // envelope setup
  this.attackLevel= 0;
  this.releaseLevel= 0;
  this.attackTime= 0;
  this.decayTime= 0;
  this.susLevel= 0;
  this.releaseTime= 0;
  // next 4 parameters hold p5.sound.js objects
  this.env=0;
  this.thisSynth=0;
  this.filter=0;
  this.delay=0;
  this.note=0;
  // filter frequency
  this.fFreq=0;
  // delay parameters
  this.delayFX= false;
  this.delayLength=0;
  this.delayFB= 0;
  this.delayFilter= 0;
  this.noteIndex=0;
  this.beat=40;
  this.strongbeatdivision=2;
  this.strongsubdivision=2;
  this.divperbar=2;
  this.divperbeat=2;
  this.divpersub=5;
  this.barperphrase=4;
  this.phrasepersection=4;
  this.bar=40;
  this.subdiv=20;
  this.finediv=4;

  this.barweight=0;
  this.beatweight=0;
  this.subweight=0;
  this.fineweight=0;

  this.strongbeatweight=0;
  this.strongsubweight=0;

  this.phrase=0;
  this.section=0;
  this.currentbeat=0;
  this.currentsub=0;

  this.maxWeight= 0;
  this.stimulusScale= 0;
  this.thresh= 0;

  this.noiseInc = 0.11;
  this.maxloudness=2;

}

//////////////// ASSIGN SETTINGS ////////////////

// setenvelope()
//
// creates the amplitude envelope for this synth's notes.
// required arguments: time and gain (level) settings for the different parts of the envelope.

Drum.prototype.setEnvelope = function(attackTime, decayTime, releaseTime, attackLevel, susLevel, releaseLevel){
  // assign parameters with values provided.
  this.attackLevel= attackLevel;
  this.releaseLevel= releaseLevel;
  this.attackTime= attackTime;
  this.decayTime= decayTime;
  this.susLevel= susLevel;
  this.releaseTime= releaseLevel;
}

// setfilter()
//
// sets the filter type and frequency

Drum.prototype.setFilter = function(filterType, frequency){
  // assign parameters with values provided.
  this.fFreq=frequency;
  this.filtAtt= filterType;
}

// setdelay()
//
// switches delay on or off,
// sets the delay effect up

Drum.prototype.setDelay = function(delayIsOn, length, feedback, filterFrequency){
  // toggle delay on or off
  this.delayFX= delayIsOn;
  // assign parameters with values provided
  this.delayLength= length;
  this.delayFB= feedback;
  this.delayFilter= filterFrequency;
}
Drum.prototype.setDivisions = function(bar, beat, subdiv, finediv, beatsperbar, divsperbeat, fineperdiv){
  this.bar = bar;
  this.beat = beat;
  this.subdiv = subdiv;
  this.finediv = finediv;
  this.divperbar = beatsperbar;
  this.divperbeat = divsperbeat;
  this.divpersub = fineperdiv;
}
Drum.prototype.setWeights = function(maxWeight, stimScale, threshold, barweight, beatweight, subweight, fineweight){
  this.maxWeight = maxWeight;
  this.stimulusScale = stimScale;
  this.thresh = threshold;
  this.barweight = barweight;
  this.beatweight = beatweight;
  this.subweight = subweight;
  this.fineweight = fineweight;
}

//////////////// LOAD INSTRUMENT ////////////////

// loadInstrument()
//
// this function sets up our instrument:
// it creates the oscillator, envelope, filter and delay
// it wires their sound outputs correctly
// it starts the sound
// should be called in main script after having called the settings functions

Drum.prototype.loadInstrument = function(){
  // load envelope
  this.env=new p5.Env();
  // setup envelope parameters
  this.env.setADSR(this.attackTime, this.decayTime, this.susLevel, this.releaseTime);
  this.env.setRange(this.attackLevel, this.releaseLevel);
  // check which filter to use
  if(this.filtAtt==="BP"){
    // if the filter attribute says BP the create a band pass filter
    this.filter= new p5.BandPass();
  }
  // if the filter attribute says LP then create a low pass filter
  if(this.filtAtt==="LP"){
    this.filter=new p5.LowPass();
  }
  // set filter frequency
  this.filter.freq(this.fFreq);
  // now load the type of oscillator used.
  // this code was written for Project 1 so it also handles drums (noise)
  // if the synth type is "pink" then we have a noise synth.
  if(this.synthType==='pink'||this.synthType==='white'){
    this.thisSynth=new p5.Noise(this.synthType);
    // if anything else (square or sine) then we have an oscillator
  } else {
    this.thisSynth=new p5.Oscillator(this.synthType);
  }
  // plug-in the amp, which will be monitored using the envelope (env) object
  this.thisSynth.amp(this.env);
  // disconnect this sound from audio output
  this.thisSynth.disconnect();
  // reconnect it with the filter this time
  this.thisSynth.connect(this.filter);
  // start audio
  this.thisSynth.start();
  // set the initial frequency. do not set if this is the noise drum.
  if(this.synthType!='pink'&&this.synthType!='white'){this.thisSynth.freq(1);
  }
  // if delayFX is true, then there is also a delay object to load
  if(this.delayFX){
    // create delay object
    this.delay = new p5.Delay();
    // update settings
    this.delay.process(this.thisSynth, this.delayLength, this.delayFB, this.delayFilter);
  }
}

// handleDrums()
//
// looped in draw(). handles playing this synth's sound.

Drum.prototype.handleDrums = function(){

  // if this instrument is turned on
  if(this.isPlaying){

    var sectionInfo = getSection(musicInc);
    var section = sectionInfo.currentSection;
    if(sectionInfo.currentSection!=lastsection){
    this.barweight = floor(map(-cos(section*0.1), -1, 1, 1, 10));
    this.beatweight = floor(map(-cos(section*0.2), -1, 1, 1, 10));
    this.subweight = floor(map(-cos(section*0.3), -1, 1, 1, 10));
    this.fineweight = floor(map(-cos(section*0.4), -1, 1, 1, 10));
    this.stimulusScale = floor(map(-cos(section*0.4), -1, 1, 20, 40));
    this.bar = floor(map(sin(section*0.0001), -1, 1, 20, 100));
    this.beat = floor(map(sin(section*0.0002), -1, 1, 10, 50));
    this.subdiv = floor(map(sin(section*0.0003), -1, 1, 3, 30));
    this.finediv = floor(map(sin(section*0.0004), -1, 1, 1, 10));
    this.divperbar = floor(this.bar/this.beat)
    this.divperbeat = floor(this.beat/this.subdiv)
    this.divpersub = floor(this.subdiv/this.finediv)

    drums2.bar = this.bar;
    drums2.beat = this.beat;
    drums2.subdiv = this.subdiv;
    drums2.finediv = this.finediv;
    drums2.divperbar = this.divperbar;
    drums2.divperbeat = this.divperbeat;
    drums2.divpersub = this.divpersub;
    drums2.barweight = floor(map(-cos(section*0.1), -1, 1, 4, 12));
    drums2.beatweight = floor(map(-cos(section*0.2), -1, 1, 3, 12));
    drums2.subweight = floor(map(-cos(section*0.3), -1, 1, 1, 12));
    drums2.fineweight = floor(map(-cos(section*0.4), -1, 1, 1, 12));
    drums2.stimulusScale = floor(map(-cos(section*0.4), -1, 1, 10, 20));

    phrase = new Phrase(sectionInfo.currentSection);
  }
    noiseSeed(sectionInfo.currentSection);
    lastsection = sectionInfo.currentSection;

    var weight =  this.salience(sectionInfo.framesSinceSection);
    var thisnoise = noise(sectionInfo.framesSinceSection*this.noiseInc);
    var stimulus = thisnoise*this.stimulusScale;
    //console.log("stimulus 1"+stimulus);

    if(stimulus+weight>this.thresh&&weight!=0){

    //var loudness = map(stimulus+weight, 0, this.stimulusScale+this.maxWeight, 0, 1);
    //  loudness = constrain(loudness, 0, 1);
      //  console.log("stimulus: "+stimulus);
      //  console.log("loudness: "+loudness);

      //this.filter.freq( 18150-loudness*18000 );
      var incomingnote = this.catchUpToNote(sectionInfo.currentSection, sectionInfo.framesSinceSection);
    //  console.log("incoming note "+incomingnote);
      this.note = incomingnote;
      //this.note = phrase.newNote(sectionInfo.currentSection, sectionInfo.framesSinceSection);
      var newNote =midiToFreq(constrain(this.note, 0, 127));
    //  console.log("THE NEW NOTE IS : "+newNote);

      this.thisSynth.freq(newNote);
    //  console.log("note: "+newNote)
      this.env.play();
      this.noteIndex+=1;
    }

  }

}

Drum.prototype.salience = function(t){

  if(musicInc%this.beat===0){
    this.currentbeat+=1;
    if(this.currentbeat>this.divperbar){
      this.currentbeat=0;
    }
  }

  if(musicInc%this.subdiv===0){
    this.currentsub+=1;
    if(this.currentbeat>this.divperbeat){
      this.currentsub=0;
    }
  }

  var factor=0;
  if(t%this.bar===0){
    factor+=this.barweight;
  }
  if(t%this.beat===0){
    var addweight=0;
    if(this.currentbeat%this.strongbeatdivision!=0){
      addweight=this.strongbeatweight;
    }
    factor+=this.beatweight+addweight;
  }
  if(t%this.subdiv===0){
    var addmoreweight=0;
    if(this.currentsub%this.strongsubdivision!=0){
      addmoreweight=this.strongsubweight;
    }
    factor+=this.subweight;
  }
  if(t%this.finediv===0){
    factor+=this.fineweight;
  }
  return factor;
}
Drum.prototype.catchUpToNote = function(section, framesince){
  var numIntervals =0;
  var startNote;
  phrase = new Phrase(section);
  phrase.lastNote = floor(map(-cos(section*0.031), -1, 1, 0, 12))
//  console.log("lastNote "+phrase.lastNote)
  noiseSeed(section);
  for (var i=0; i<framesince; i++){
    var weight =  this.salience(i);
    var thisnoise = noise(i*this.noiseInc);
    var stimulus = thisnoise*this.stimulusScale;
    if(stimulus+weight>this.thresh&&weight!=0){
    startNote = phrase.newNote(section, i);
  //  console.log("start note "+startNote)
    }
  }
  return startNote;
}

Drum.prototype.catchUpSection = function(){
  var numIntervals=0;
  var catchupstart = currentSection*sectionLength;
  var catchupend = musicInc;
  phrase.lastNote = phrase.fullScaleNotes[phrase.scaleNotes.length];

  noiseSeed(currentSection);
//  console.log("start "+catchupstart)
//  console.log("end "+catchupend);
  var catchuptime = [];

  for (var i=catchupstart; i<catchupend; i++){
    var weight =  this.salience(i);
    var thisnoise = noise(i*this.noiseInc);
    var stimulus = thisnoise*this.stimulusScale;
    if(stimulus+weight>this.thresh&&weight!=0){
    numIntervals +=1;
    catchuptime.push(i);
    }
  }
// console.log("intervals "+numIntervals);
 for (var i=0; i<numIntervals; i++){
   phrase.lastNote = phrase.newNote(currentSection, catchuptime[i]);
 }
 // console.log("lastNote = "+phrase.lastNote);

}
