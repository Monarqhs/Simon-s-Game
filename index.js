var btnClr = [
    "red",
    "blue",
    "green",
    "yellow"
]

var gamePattern = []

var userClickPattern = []

var start = false
var level = 0

$(document).keypress(function(){
    if (!start){
        $("#level-title").text("level " + level)
        nextSeq()
        start = true
    }
})

$(".btn").on("click",function(){
    var userClr = $(this).attr("id")
    userClickPattern.push(userClr)
    // console.log(userClickPattern);
    playSound(userClr)
    animatePress(userClr)

    checkAnswer(userClickPattern.length-1)
    
})

function checkAnswer(currLevel){
    if(gamePattern[currLevel] === userClickPattern[currLevel]){
        console.log("success");
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSeq()
            }, 1000)
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart!")
        console.log("wrong");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        
        startOver()
    }
}

function nextSeq(){
    userClickPattern = []
    level++

    $("#level-title").text("Level " + level)

    var randomNum = Math.floor(Math.random() * 4)

    var randomClr = btnClr[randomNum]

    gamePattern.push(randomClr)
    
    $("#" + randomClr).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomClr)
    // animatePress(randomClr)
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currClr){
    $("#" + currClr).addClass("pressed")

    setTimeout(function(){
        $("#" + currClr).removeClass("pressed")
    }, 100)
}

function startOver(){
    level = 0
    gamePattern = []
    start = false
}
