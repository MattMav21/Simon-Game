let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let gameStarted = false;
let level = 0;
let counter = 0;
let loading = false;
let gameOver = false;

function restartGame () {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    counter = 0;
}

$(`.btn`).on("click", function () {

    if (!gameStarted || loading) {
        return;
    };

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    let indexedColor = gamePattern[counter];

    counter++;

    if (userChosenColor !== indexedColor) {
        $("body").addClass("game-over");
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        gameStarted = false;
        gameOver = true;
        counter = 0;

        if (level = 2) {
            $("h1")[0].innerText = `GAME OVER! \n \n You completed 1 level. \n \n Press the spacebar to restart!`;
        } else {
            $("h1")[0].innerText = `GAME OVER! You completed ${level-1} levels.`;
        }

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
    };

    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
        $("h1")[0].innerText = `Level ${level} Complete!`;
        loading = true;

        setTimeout(function() {
            userClickedPattern = [];
            counter = 0;
            loading = false;
            nextSequence();
        }, 2000);

    };

});

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    let selectedElement = $(`#${randomChosenColor}`);
    selectedElement.fadeOut(75).fadeIn(75);
    level++;
    $("h1")[0].innerText = `Level ${level}`;
};

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
};

function animatePress(currentColor) {
    let selected = $(`.${currentColor}`);
    selected.addClass("pressed");
    setTimeout(function(){
        selected.removeClass("pressed");
    }, 100);
};

if (/Mobi|Android/i.test(navigator.userAgent)) {
    $(document).on("touchstart", function() {
        if (gameOver) {
            restartGame();
            nextSequence();
            gameStarted = true;
            gameOver = false;
        };
    
        if (!gameStarted) {
            nextSequence();
            gameStarted = true;
        };
    });
};

$(document).on("keypress", function(event) {
    if (gameOver) {
        if (event.key == " ") {
            alert("GAME RESTARTED!");
            restartGame();
            nextSequence();
            gameStarted = true;
        } else {
            return;
        }
    };

    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    };
})
