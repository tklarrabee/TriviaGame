$(document).ready(function () {

    //--------------------------Variables--------------------------------------//

    var correctAnswers = 0;
    var highScore = 0;
    // var answer;
    var time = levelUp();
    function levelUp() {
        if (correctAnswers < 5) {
            return 8;
        }
        else if (correctAnswers < 10) {
            return 6;
        }
        else if (correctAnswers < 15) {
            return 6;
        }
        else {
            return 5;
        }
    }

    var intervalId;
    var userSelection;

    // Starts the game
    function startGame() {
        intervalId = setInterval(countDown, 1000);
        mathProb();
    }

    function stopGame() {
        clearInterval(intervalId);
        alert("You lost. Score: " + correctAnswers);
        if(correctAnswers > highScore){
            $("#highScore").empty();
            highScore = correctAnswers;
            $("#highScore").append(highScore);
        }
        correctAnswers = 0;
    }

    function reset() {
        clearInterval(intervalId);
        $("#maths").empty();
        mathProb();
        time = levelUp();
        intervalId = setInterval(countDown, 1000);
    }

    function countDown() {
        time--;
        // $("#countdown").text(time);
        $("#countdown").html("<h1 class='display-4'>"+time+"</h1>");
        if (time === 0) {
            stopGame();
            return;
        }
    }

    function mathProb() {
        $("#maths").empty();
        var numOne = Math.floor(Math.random() * 65) + 3;
        var numTwo = Math.floor(Math.random() * 67) + 3;
        // + / - *
        var randomOperator = Math.floor(Math.random() * 2);
        var answer = mathtastic(randomOperator, numOne, numTwo);
        inputDisplay(answer, numOne, numTwo, randomOperator);
        $(".answer").on("click", function () {
            userSelection = parseInt($(this).attr("data-choice"));
            if (userSelection === answer) {
                correctAnswers++;
                reset();
            } else {
                stopGame();
            };
        });
        $("#numBox").keyup(function (event) {
            if (event.which === 13) {
                userSelection = parseInt($("#numBox").val());
                correctAnswers++;
                reset();
            }
        });
    };

    function mathtastic(op, nOne, nTwo) {
        var mathyMath;
        if (op === 0) {
            if (nOne >= nTwo) {
                mathyMath = nOne - nTwo;
                console.log("Answer: " + mathyMath);
                console.log("nOne: " + nOne + " nTwo: " + nTwo);
                return mathyMath;
            }
            else {
                mathyMath = nTwo - nOne;
                return mathyMath;
            }
        } else if (op === 1) {
            mathyMath = nOne + nTwo;
            // console.log(mathyMath);
            return mathyMath;
        }
    }

    function inputDisplay(sol, nOne, nTwo, opp) {
        $("#input").empty();
        $("#maths").empty();
        var firstNum;
        var secondNum;
        if (nOne >= nTwo) {
            firstNum = nOne;
            secondNum = nTwo;
        } else {
            firstNum = nTwo;
            secondNum = nOne;
        }
        var operator;
        if (opp === 0) {
            operator = " - ";
        } else {
            operator = " + ";
        }
        $("#maths").append(firstNum + operator + secondNum);
        if (correctAnswers < 10) {
            var range = Math.floor(Math.random() * 5) + 1 + sol, nOne, nTwo;
            // console.log("RANGE " + range)
            for (let i = 5; i >= 0; i--) {
                if (range === 0) {
                    range += 10;
                } else {
                    range--;
                    let button = $("<button>");
                    button.attr("data-choice", range);
                    button.attr("type", "button");
                    button.text(range);
                    button.addClass("answer btn btn-warning");
                    $("#input").append(button);
                }
            }
        }
        else {
            let form = $("<input>");
            form.attr("type", "text");
            form.attr("id", "numBox")
            $("#input").append(form);
            form.focus();
        }
    }
    $("#start").click(function(){
        $("#startScreen").hide();
        $("#mathArea").attr("hidden", false);
        startGame();
    });
    
});