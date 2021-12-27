$(document).ready(function() {
  var buttons = ["red", "yellow", "blue", "green"];
  var gamePattern = [];
  var userPattern = [];
  var level = 0;
  var started = false;


  $("#start").click(function() {
    var i = 3;
      setTimeout(function(){
        if(!started) {
          $(".play-tag").text("Best of Luck!!")
          started = true;
          nextSequence();
          $("#start").hide();
          }
      }, 2000);
  });

// Checking user interaction
$(".box").click(function() {
  var userSelection = $(this).attr("id");
  userPattern.push(userSelection);
  animatePress(userSelection);
  playSound(userSelection);
  checkSequence(userPattern.length - 1);
});

  function nextSequence(){
    userPattern = [];
    $(".play").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttons[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }

  function checkSequence(currentLevel) {
    if(userPattern[currentLevel] === gamePattern[currentLevel]) {
      if(userPattern.length === gamePattern.length)
      {
        setTimeout(function (){
          level++;
          nextSequence();
        }, 1000);
      }
    }

    else {
      playSound("wrong");
      $("#game").addClass("game-over");
      setTimeout(function() {
        $("#game").removeClass("game-over");
      }, 200);

      resetGame();
    }
  }

  function resetGame() {
    level = 0;
    gamePattern = [];
    started = false;
    $("#start").text("Restart Game");
    $("#start").show();
  }

  function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
      $("#" + currentColor).removeClass("pressed");
    }, 200);
  }
});
