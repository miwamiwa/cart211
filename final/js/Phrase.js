function Phrase(noiseSeed){
  this.scale = new Scale();
  this.scaleNotes = this.scale.newKey;
  this.fullScaleNotes = concat(this.scaleNotes, concat(this.scaleNotes, concat(this.scaleNotes, this.scaleNotes)));

  this.intervals = [];
  this.directions = [];
  this.directionWeights = [2, 1, 2];
  this.stepWeight = 5;
  this.leapWeight = 2;
  this.noiseRate = 1;
  this.noiseInc =0;
  this.noiseSeed =noiseSeed;
  this.totalSeeds =5;

  this.rootNote = 36;
  this.lastNote =63;
  this.notes = [this.lastNote];
  this.currentIdeas = [1];
  this.currentIdeasWeights = [10];
  //this.newIdeas = [2, 3, 4, 5, 6, 7];
  //this.newIdeasWeights = [6, 5, 4, 2, 2, 1];
  this.newIdeas = [2, 3, 4, 5, 6, 7];
  this.newIdeasWeights = [1, 1, 1, 1, 1, 1];

  this.currentIdeaWeight = 5;
  this.newIdeaWeight =1;
  this.nextNote = 0;
  this.distanceFromRoot =this.rootNote;

  this.maxDistance =50;
}

Phrase.prototype.newNote = function(section, frame){
this.noiseSeed = section;

  var chosenDirection = 0;
  chosenDirection = this.whichDirection();
  this.directions.push(chosenDirection);

  var chosenInterval =0;
  //console.log("picking new interval");
  chosenInterval = this.whichInterval();
  var intervalVector = chosenInterval*chosenDirection;
  this.intervals.push(intervalVector);

  //
  this.lastNote = this.lastNote+intervalVector;
  this.nextNote = this.rootNote+arraySum(this.fullScaleNotes, this.lastNote);

  this.notes.push(this.nextNote);
  //console.log("notes :"+this.notes);
//  this.noiseInc += this.noiseRate;
this.noiseInc = frame;

  // DISPLAY NOTES ON SCREEN
this.displayNotes();
  // RETURN NOTE
  return this.nextNote;

}

// displaynotes()
//
// displays keys and notes being played

Phrase.prototype.displayNotes = function(){

    var notecounter =this.rootNote;

    var sw =divwidth/arraySum(this.fullScaleNotes, 0);
    var lineLength = 50;
    var lineX = height*0.75-lineLength/2;
    var scalemin = this.rootNote;
    var scalemax = scalemin + arraySum(this.fullScaleNotes, 0);
    strokeWeight(sw);

    //grid
    for (var i=scalemin; i<scalemax; i++){
      var ypos = map(i, scalemin, scalemax, 0, divwidth);
      stroke(166, 193, 191);
      line( ypos,lineX,  ypos, lineX+lineLength);
    }
    //scalenotes
    for (var i=0; i<this.fullScaleNotes.length; i++){
     stroke(101, 122, 120);
      notecounter += this.fullScaleNotes[i];
      //var thisNoteFreq = midiToFreq(notecounter);
      var ypos = map(notecounter, scalemin, scalemax, 0, divwidth);
      line(ypos, lineX, ypos,  lineX+lineLength);
    }
    //currentnote
    stroke(5, 15, 14);
    var ypos = map(this.nextNote, scalemin, scalemax, 0, divwidth);
    line(ypos, lineX, ypos, lineX+lineLength);

  //currentinterval
  noStroke();
  textSize(20);

}


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

  return newinterval;
}

Phrase.prototype.leapOrStep = function(){
  noiseSeed(this.noiseSeed+4);

  var stim = noise(this.noiseInc);
  var stimDivision = this.stepWeight + this.leapWeight;
  var portion = 1 / stimDivision;
  var choice=0;

  if(stim<stepWeight*portion){

    choice = "step";

  } else{

    choice = "leap";
  }
  //console.log("motion by: "+choice);
  return choice;
}

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
  //console.log("interval chosen: "+choice);
  return choice;
}

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
    else
    if(stim<portion*sum&&stim>portion*arraySum(this.currentIdeasWeights, i-1)){
      choice = i;
    }
  }
  var result = this.currentIdeas[choice];
  this.newIdeaWeight += 1;
  //  console.log("interval will be a currently known idea");
  //  console.log("current ideas: "+this.currentIdeas);
  //  console.log("current idea choice index: "+choice);
  //  console.log("chosen current idea: "+result);
  return result;
}

Phrase.prototype.whichNewIdea = function(){
  //  console.log("interval will be a new idea");
  //  console.log("new ideas "+this.newIdeas);
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

  //console.log("new idea choice index: "+choice);
  //console.log("chosen new idea: "+result);

  this.newIdeasWeights = removeItem(this.newIdeasWeights, choice);
  this.newIdeas = removeItem(this.newIdeas, choice);

  //console.log("new new ideas: "+this.newIdeas);
  //console.log("new current ideas"+this.currentIdeas);
  return result;
}

Phrase.prototype.whichDirection = function(){
  this.distanceFromRoot = this.lastNote-64;
  if(this.distanceFromRoot>40){
    this.directionWeights = [5, 3, 3];
  }
  else if (this.distanceFromRoot<-40){
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
