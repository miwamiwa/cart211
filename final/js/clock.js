

  function setTime(){
  var d = new Date();
  currentT[0] =  d.getFullYear();
  currentT[1] =  d.getMonth()+1;
  currentT[2] =  d.getDate();
  currentT[3] =  d.getHours();
  currentT[4] =  d.getMinutes();
  currentT[5] =  d.getSeconds();

  	tellTime();
  }

  var dayzInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function adjustTime(x, y){

  var newTime = parseInt(clockT[y].innerHTML, 10) + x;

  if(y===1 && currentT[2] === 31 && currentT[1] === 12 && x>0){
  	currentT[1] = 1;
  	currentT[2] = 31;
  	currentT[0] +=1;
  }
  else if(y===1 && currentT[2] === 31 && currentT[1] === 1 && x<0){
  	currentT[1] = 12;
  	currentT[2] = 31;
  	currentT[0] -=1;
  }
  else if(y===1 && currentT[2] >= dayzInMonth[ currentT[1]-2] && x===-1 ){
  	currentT[1] = newTime;
  	currentT[2] = dayzInMonth[currentT[1]-1];
  }
  else if(y===1 && currentT[2] >= dayzInMonth[currentT[1]] && x===1 ){
  	currentT[1] = newTime;
  	currentT[2] = dayzInMonth[currentT[1]-1];
  }
  else{
  currentT[y] = newTime;
  }

  tellTime();

  }

  function tellTime(){
  	for (var i=0; i<6; i++){
  		clockT[i].innerHTML = currentT[i];
  	}
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

  function showFunction(){
  	document.getElementById("display_me").style.opacity = 1;
  displaythis = true;
  }

  function hideFunction(){
  	document.getElementById("display_me").style.opacity = 0;
  	document.getElementById("display_me").style.opacity = 0;
  	displaythis = false;
  }

  function toggleShowHide(){
  	 if(!displaythis){
  		 showFunction()
  	 }
  	 else {
  		 hideFunction()
  	 }
  }
