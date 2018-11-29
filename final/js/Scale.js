
// newnewKey()
//
// generates a new random newKey
// newKeys are made up of random intervals stacked together until a multiple of 12 (an octave) is reached.
// possible intervals are the ones contained within the max and min boundaries.
// based on that max patch i made for a class a while ago that generated random newKeys..


function Scale(section){

  this.minInterval = 1+floor(map(-cos(section*0.00000011), -1, 1, 0, 4));
  this.maxInterval = 2+floor(map(-cos(section*0.0000001), -1, 1, 0, 4));

  this.totalInterval = 0;
  this.kNoiseRate = 1;
  this.kNoiseSeed = section;
  this.kNoiseInc =0;
  this.newKey = [];
  this.fullKey = [];
  this.stopGenerating = false;
  this.newKeyOctaveSpan = 0;

  //  console.log("new newKey");
    noiseSeed(floor(section/400));
    this.kNoiseInc=0;
    while(!this.stopGenerating){

    this.kNoiseInc += this.kNoiseRate;

    this.thisInterval = 0;
    this.noteChoice =0;
    this.possibleIntervals = this.maxInterval - this.minInterval + 1;

    this.noiseResult = noise(this.kNoiseInc);
    this.noiseSec = 1/this.possibleIntervals;

    //console.log("noiseResult: "+this.noiseResult);

    // the following for() loop makes a choice using noiseResult
    for (var i=0; i< this.possibleIntervals; i++){
      if(this.noiseResult > i*this.noiseSec && this.noiseResult < (i+1)*this.noiseSec){
        this.noteChoice = i;
      }
    }
    // interval value for this note
    this.thisInterval = this.minInterval + this.noteChoice;
    // add that to total count
    this.totalInterval += this.thisInterval;
    // add note to array
    this.newKey.push(this.thisInterval);
    // if total count reaches an octave, stop generating.
    if(this.totalInterval%12===0&&this.totalInterval!=0){
      this.stopGenerating = true;
      this.newKeyOctaveSpan = this.totalInterval/12;
    }
  }
var newnote=0;
while(newnote<60){
for (var i=0; i<this.newKey.length; i++){
  newnote += this.newKey[i];
  this.fullKey.push(this.newKey[i]);
}
}


}
