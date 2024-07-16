// Initialize variables
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

// Event handler for keyboard input on PC/Desktop
$(document).on("keydown", function(event) {
    if (!gamePattern.length) { // Check if game hasn't started yet
        nextSequence();
    }
});

// Event handler for button clicks on Mobile/Touchscreen
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Function to generate next sequence/color in the game
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4); // Generate random number 0-3
    var randomChosenColour = buttonColours[randomNumber]; // Select color from array
    gamePattern.push(randomChosenColour); // Add to game pattern
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // Flash button
    playSound(randomChosenColour); // Play corresponding sound
    $("h1").text("Level " + gamePattern.length); // Update level title
}

// Function to check user's answer against the game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000); // Move to next level after correct sequence
            userClickedPattern = []; // Clear user input pattern
        }
    } else {
        playSound("wrong"); // Play wrong sound
        $("body").addClass("game-over"); // Flash red on mistake
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over! Press any key to restart."); // Game over message
        startOver(); // Restart game
    }
}

// Function to play sound based on button color or event
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to restart the game
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
}
