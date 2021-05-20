var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var num = 3;

$(document).on("keypress", function (event) {
    if (!gameStarted) {
        level = 0;
        gameStarted = true;
        $("#level-title").text("Level 1");
        nextSequence();
    }
});


$("div[type='button']").click(function (event) {
    var userChosenColour = event.target.id;
    animatePress(userChosenColour);
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
    userClickedPattern.push(userChosenColour);
    //    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over, Press any key to restart!");
    gameStarted = false;
    gamePattern = [];
    level = 0;
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
        console.log("success");
    else {
        startOver();
    }

    if (userClickedPattern.length === gamePattern.length) {
        nextSequence();
    }
}


function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    //     console.log(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    console.log(audio);
    audio.play();

}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}
