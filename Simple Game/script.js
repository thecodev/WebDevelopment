const up_div =  document.getElementById("u");
const down_div =  document.getElementById("d");
const restart_div =  document.getElementById("rs");
const score_span =  document.getElementById("s");
const highscore_span =  document.getElementById("hs");
const field = document.getElementById('field');

const rows = 5;
const cols = 30;
var num;
var currentPID = 301;
var newPid = currentPID;
var score = 0;
var highscore = 0;
var num2;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function grid(){
  
  const cr = Math.floor( Math.random() * rows) + 1;
  let cell = (cr*100) + cols  ;

  while( cell >= (cr * 100) ){
    await sleep(150);
    const comp_cell = document.getElementById(cell);
    comp_cell.classList.add('comp');
    setTimeout( function() { comp_cell.classList.remove('comp')} , 150);
    cell--;
  }

  updatescore(score);
  // return cell;
}

function playerMovement(userInput){
  
  var temp = newPid;
  
  switch(userInput){
    case 'u':    
    if( temp >=201) {  
      newPid = temp - 100;  
      }    
    break;
    case 'd': 
    if (temp <= 401){     
      newPid = temp + 100;  }    
    break;
    case 'rs':
    newPid = currentPID;
     
  }
  //console.log('temp',temp);
  document.getElementById(temp).classList.remove('player');
  document.getElementById(newPid).classList.add('player');
  console.log(document.getElementById(newPid).classList);
  // checkcolide(newPid);
}


async function checkcolide(newPid){
  if (document.getElementById(newPid).classList.contains('comp')){
      console.log('game over');
      // await sleep(5000);
      clearInterval(num);
      clearInterval(num2);
    if( highscoreUpdate(score) == 1 ){
        field.innerHTML = `<tr><td><h1>Well Played !!</h1></td><br><td><h1>Your High Score ${ Math.round(score)}</h1></td></tr>`;
      }
      else{
        field.innerHTML = `<tr><td><h1>Game over</h1></td><br><td><h1>Your Score ${ Math.round(score)}</h1></td></tr>`;
      }
      score = 0;
      document.getElementById(temp).classList.remove('player');
      temp = currentPID;
  } 
 
}

function highscoreUpdate(Score){
  if (Score > highscore){
    highscore = Score;
    highscore_span.innerHTML = Score;
    return 1;
  }
  else{
    return 0;
  }
}

function game(userInput){
  console.log(""+userInput + grid());
  //switch(userInput):
  playerMovement(userInput);
  // updatescore(score);
  // num2 = setInterval(function(){ updatescore(score); }, 1000);
}

function creategrid( r , c){
  var s = '';
  for (let i = 1 ;i<= r;i++){
    s += `<tr id ="${i}">`;
    for (let j=0; j <= c; j++){
      s+=` <td id="${(i*100) +j}"><span> - - </span> </td>`;
    }
    s+=`</tr>`;
  }
  console.log(s);
  return s;
}



function updatescore(Score){
  score = Score + 1;
  score_span.innerHTML = score;
}

function startGame(){
  field.innerHTML = creategrid( rows, cols);
  const currentEl = document.getElementById('301');
  currentEl.classList.add('player');
  // var currentPID = 301;
  
  num = setInterval(function(){ checkcolide(newPid); }, 20);
  // num2 = setInterval(function(){ grid(); }, 30000);
  // var newPid = currentPID;  
}

function main() {
   
  startGame();
  
  up_div.addEventListener('mouseover', function(){
  game('u');
  console.log('up');
  })

  down_div.addEventListener('mouseover', function(){
    game('d');
    console.log('down');
  })

  restart_div.addEventListener('click', function(){
    console.log('restart');
    startGame();
   
  })
  
 
}
main();// javascript
