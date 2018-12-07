/*
This is where the current scale is saved, and where new notes are generated.
*/
function Phrase(section){
  this.scale = new Scale(section);
  this.scaleNotes = this.scale.newKey;
  this.fullScaleNotes = this.scale.fullKey;
  this.intervals = [];
  this.directions = [];
  this.directionWeights = [2, 1, 2];
  this.stepWeight = sectionData.stepweight;
  this.leapWeight = sectionData.leapweight;
  this.noiseRate = 1;
  this.noiseInc =0;
  this.noiseSeed =section;
  this.totalSeeds =5;
  this.rootNote = 36;
  this.lastNote =63;
  this.notes = [this.lastNote];
  this.currentIdeas = [1];
  this.currentIdeasWeights = [10];
  this.newIdeas = [2, 3, 4, 5, 6, 7];
  this.newIdeasWeights = [
    sectionData.ni1weight,
    sectionData.ni2weight,
    sectionData.ni3weight,
    sectionData.ni4weight,
    sectionData.ni5weight,
    sectionData.ni6weight
  ];
  this.currentIdeaWeight = 5;
  this.newIdeaWeight =1;
  this.nextNote = 0;
  this.distanceFromRoot =this.rootNote;
  this.maxDistance =50;
}

// newnote()
// generate an interval to add to the last note

Phrase.prototype.newNote = function(section, frame){

  this.noiseSeed = section;

  var chosenDirection = 0;
  chosenDirection = this.whichDirection();
  this.directions.push(chosenDirection);

  var chosenInterval =0;
  var newdata = this.whichInterval();
  chosenInterval = newdata.interval;
  var intervalVector = chosenInterval*chosenDirection;
  this.intervals.push(intervalVector);
  this.lastNote = this.lastNote+intervalVector;
  this.nextNote = this.rootNote+arraySum(this.fullScaleNotes, this.lastNote);

  this.notes.push(this.nextNote);
  this.noiseInc = frame;

  // DISPLAY NOTES ON SCREEN
  this.displayNotes();

  var data = {
    direction: chosenDirection,
    interval: chosenInterval,
    leapOrStep: newdata.leapOrStep,
    nextNote: this.nextNote,
  }
  // RETURN NOTE
  return data;

}

// displaynotes()
//
// displays keys and notes being played

Phrase.prototype.displayNotes = function(){

  var notecounter =this.rootNote;

  var sw =divwidth/arraySum(this.fullScaleNotes, 0);
  var lineLength = 50;
  var lineX = height*0.64-lineLength/2;
  var scalemin = this.rootNote;
  var scalemax = scalemin + arraySum(this.fullScaleNotes, 0);



  //grid
  for (var i=0; i<127; i++){
    strokeWeight(sw-10);
    var ypos = map(i, scalemin, scalemax, 0, divwidth);
    stroke(166, 193, 191);
    line( ypos,lineX,  ypos, lineX+lineLength);
  }
  //scalenotes
  for (var i=0; i<this.fullScaleNotes.length; i++){
    strokeWeight(sw);
    stroke(101, 122, 120);
    notecounter += this.fullScaleNotes[i];
    //var thisNoteFreq = midiToFreq(notecounter);
    var ypos = map(notecounter, scalemin, scalemax, 0, divwidth);
    line(ypos, lineX, ypos,  lineX+lineLength);
  }
  //currentnote
  stroke(193, 176, 166);
  strokeWeight(sw-4);
  var ypos = map(this.nextNote, scalemin, scalemax, 0, divwidth);
  line(ypos, lineX, ypos, lineX+lineLength);

  //currentinterval
  noStroke();
  textSize(20);

}

// whichinterval()
// fires leaporstep() and currentornew() and returns the resulting interval

Phrase.prototype.whichInterval = function(){
  var motion="";
  motion = this.leapOrStep();
  if(motion==="leap"){
    this.currentIdeasWeights[0]=0;
  }
  else if(motion==="step"){
    this.currentIdeasWeights[0]=20;
  }
  var newinterval = this.currentOrNew();
  var result = {
    interval : newinterval,
    leapOrStep: motion,
  }
  return result;
}

// leaporstep()
// decides if step or leap motion is to be favored

Phrase.prototype.leapOrStep = function(){
  noiseSeed(this.noiseSeed+4);

  var stim = noise(this.noiseInc);
  var stimDivision = this.stepWeight + this.leapWeight;
  var portion = 1 / stimDivision;
  var choice=0;

  if(stim<this.stepWeight*portion){
    choice = "step";
  } else{
    choice = "leap";
  }
  return choice;
}

// currentornew()
// decides between new and already used intervals

Phrase.prototype.currentOrNew = function(){
  noiseSeed(this.noiseSeed);
  var stim = noise(this.noiseInc);
  var stimDivision = this.currentIdeaWeight + this.newIdeaWeight;
  var portion = 1 / stimDivision;
  var choice=0;

  if(stim<this.currentIdeaWeight*portion||this.newIdeas.length===0){
    choice = this.whichCurrentIdea();
  } else{
    choice = this.whichNewIdea();
  }
  return choice;
}

// whichcurrentidea()
// returns an interval taken from currentideas array

Phrase.prototype.whichCurrentIdea = function(){

  noiseSeed(this.noiseSeed+1);
  var stim = noise(this.noiseInc);
  var stimDivision = arraySum(this.currentIdeasWeights, 0);
  var portion = 1 / stimDivision;
  var choice=0;
  for (var i=0; i<this.currentIdeas.length; i++){
    var sum = arraySum(this.currentIdeasWeights, i);
    if(i===0&&stim<portion*sum){
      choice = i;
    }
    else if(stim<portion*sum&&stim>portion*arraySum(this.currentIdeasWeights, i-1)){
      choice = i;
    }
  }
  var result = this.currentIdeas[choice];
  this.newIdeaWeight += 1;
  return result;
}

// whichnewidea()
// returns an interval picked from the newideas array

Phrase.prototype.whichNewIdea = function(){
  noiseSeed(this.noiseSeed+2);
  var stim = noise(this.noiseInc);
  var stimDivision = this.newIdeas.length;
  var portion = 1 / stimDivision;
  var choice=0;
  for (var i=0; i<stimDivision; i++){
    if(stim<portion*(i+1)&&stim>portion*i){
      choice = i;
    }
  }
  this.currentIdeas.push(this.newIdeas[choice]);
  this.currentIdeasWeights.push(this.newIdeasWeights[choice]);
  this.currentIdeaWeight+=2;
  var result = this.newIdeas[choice];

  this.newIdeasWeights = removeItem(this.newIdeasWeights, choice);
  this.newIdeas = removeItem(this.newIdeas, choice);

  return result;
}

// whichdirection()
// picks whether voice will move up or down the scale
// distance from middle note will skew that decision

Phrase.prototype.whichDirection = function(){
  var middle = arraySum(this.fullScaleNotes, this.fullScaleNotes.length/2);
  this.distanceFromRoot = this.lastNote-middle;
  if(this.distanceFromRoot>middle/2){
    this.directionWeights = [5, 3, 3];
  }
  else if (this.distanceFromRoot<-middle/2){
    this.directionWeights = [1, 1, 5];
  }
  else{
    this.directionWeights = [2, 1, 2];
  }
  //console.log("chosing direction");
  noiseSeed(this.noiseSeed+3);
  var stim = noise(this.noiseInc);
  var stimDivision = arraySum(this.directionWeights, 0);
  var portion = 1 / stimDivision;
  var choice=0;
  for (var i=0; i<3; i++){
    var sum = arraySum(this.directionWeights, i);
    if(i===0&&stim<portion*sum){
      choice = i;
    }
    else
    if(stim<portion*sum&&stim>portion*arraySum(this.directionWeights, i-1)){
      choice = i;
    }
  }
  choice = map(choice, 0, 2, -1, 1);
  //console.log("direction chosen: "+choice);
  return choice;

}
