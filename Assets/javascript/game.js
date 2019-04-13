/* Player must answer a question within the alotted time
Win condition, reset game
object with questions in it
Correct answer counter
Wrong Answer counter*/


$(document).ready(function() {

    //--------------------------Variables--------------------------------------//
    var clockRunning = false;
    var correctAnswers = 0;
    var answer;
    var time = levelUp();
    function levelUp(){
        if( correctAnswers < 5){
            return 8;
        }
        else if( correctAnswers < 10){
            return 6;
        }
        else if( correctAnswers < 15){
            return 4;
        }
        else{
            return 3;
        }
    }
    console.log(levelUp());
    
    var intervalId;
    var userSelection;
    
    // Math problems generated with 2 random numbers
    // Math problems get harder as the level goes up, every 5 or something
    // Operator switches randomly between + and - 
    // Time limit counts down on the page
    // Page is reloaded for every correct answer the level will spit out math problems until you lose
    
    window.onload = function() {
        $(".answer").on("click", function stupidTest(inp){
            $(this).val("data-choice");
        });

    function startGame() {
        if(!clockRunning){
            intervalId = setInterval(countDown, 1000);
            clockRunning = true;
            var ans = mathProb();
            $("#maths").append(ans);
            console.log(ans);
        }
    }
    
    function stopGame() {
        clearInterval(intervalId);
        clockRunning = false;
        alert("You lost. Score: " + correctAnswers);
    }
    
    function countDown() {

        time--;
        $("#countdown").text(time);
        if(time === 0){
            stopGame();
            return;
        }
    
    }

    function reset() {

    }

    function mathProb(){
        $("#maths").empty();
        var numOne = Math.floor(Math.random()*15) + 4;
        var numTwo = Math.floor(Math.random()*15) + 4;
        answer = numOne + numTwo;
        inputDisplay(answer);
        return numOne + " + " + numTwo;

    }


    function inputDisplay(a){
        
        
        $("#input").empty();
        if(correctAnswers < 10){
            var range = Math.floor(Math.random()*5) + 1 + a;
            console.log("RANGE " + range)
            for(let i = 5; i >= 0 ; i--){
                range--;
                let button = $("<button>");
                button.attr("data-choice", range );
                button.text(range);
                button.addClass("answer");
                $("#input").append(button);
                console.log(i);
            }
        }
        else{
            numberEnter();
        }
    }
    



    startGame();
    console.log( " = " + answer);
    // inputDisplay(answer);
    
});


