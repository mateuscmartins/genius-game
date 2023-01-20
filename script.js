//The engines of the Genius Game are here

const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = []; //This array preserves the sequence of the game
const userClickedPattern =[]; //This array preserves the sequence that the gamer hits all along the match
let level = 0; //This variable defines the level of the game
let lastRound = 0;

//This step is responsable to catch the player click to start the game
$('.start-btn').click(function(){
  nextSequence();
})

//This step is responsable to deal with the player actions
//The userChosenColor refers to the color that the player chooses
//Then this color is added to the userClickedPattern array
$('.btn').click(function(){
  
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    lastRound = userClickedPattern.length - 1;
    compareArrays(lastRound);
})

//This step is responsable to deal with the action after the user click on the restart button
//All the variables must be restart
$('.restart-btn').click(function(){
  
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  $('body').removeClass('game-over');
  $('#level-title').removeClass('hide');
  $('#level-title-game-over').addClass('hide');
  $('#score').addClass('hide');
  nextSequence();
  
})

//This function creates the random sequence of the game
//The randomNumber is the index number used to chose the random color on the buttonColors array
//Step-by-step the new button is added to the gamePattern array
//The for loop runs through the gamePattern array to blink the buttons
function nextSequence(){
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  userClickedPattern.length = 0;
  
  changeLevelTitle(level);
  
  level++;

  for(let i = 0; i < gamePattern.length; i++){
    blinkTheSequence(i, gamePattern);
  } 
  
}

//This function run through the gamePattern array and execute the blink effect over the buttons
function blinkTheSequence(i, gamePattern){
  setTimeout(function(){
    blinkTheButton(gamePattern[i]);
  },1000 * i);
}

//This function make blink effect over the buttons
function blinkTheButton(buttonId){
  $('#'+buttonId).fadeOut(100).fadeIn(100);
}

//This function is responsable for the animation of the button when the player hits it
//The class .pressed is added and after 100 ms the same class is removed from the hitted button
function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  }, 100)
}

//This function is responsable for change the text of the h1 tag to represent the current level of the game
function changeLevelTitle(level){
  $("#level-title").text("Level "+level);
}

//This function is responsable for compare both arrays to  determine if the games continue or not considering the user pattern
function compareArrays(lastRound) {
  
  if(gamePattern[lastRound] === userClickedPattern[lastRound]){

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    
  }else{

    $('body').attr('class', 'game-over');
    $('#level-title').addClass('hide');
    $('#level-title-game-over').removeClass('hide');
    $('#score').removeClass('hide').text("Score: "+(level-1));
  }
}