var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStarted = false; // Flag to track if the game has started
var level = 0;

$(document).on("keydown", function(event){
    if (!gameStarted) {
        gameStarted = true; // Set gameStarted flag to true on first keydown
        nextSequence();
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); // Simplified random number generation
    var randomChosenColour = buttonColours[randomNumber]; // Select random color from buttonColours array

    // Add chosen color to game pattern
    gamePattern.push(randomChosenColour);
    console.log("Current game pattern:", gamePattern);

    // Update level display
    $("h1").text("Level " + (gamePattern.length));

    // Show the current color in sequence
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // Play sound for the chosen color
    playSound(randomChosenColour);
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id"); // Get the id of the clicked button
    playSound(userChosenColour); // Play sound for the clicked color
    animatePress(userChosenColour); // Add pressed animation
    userClickedPattern.push(userChosenColour); // Add clicked color to user pattern
    checkAnswer(userClickedPattern.length - 1); // Check answer against game pattern
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // If current level is correct, check if user completed entire pattern
        if (userClickedPattern.length === gamePattern.length){
            console.log("Success");
            setTimeout(nextSequence,1000); // Move to next level after delay
            userClickedPattern = []; // Clear user pattern for next round
        }
    }
    else {
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over! Press any key to continue...");
        playAgain();
    }
}

function playSound(name){
    // Play audio based on color name
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    // Add pressed class and animation to clicked button
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playAgain(){
    // Reset game patterns and level
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = false; // Reset gameStarted flag
}
