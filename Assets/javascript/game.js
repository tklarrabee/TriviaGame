$(document).ready(function () {

    //--------------------------Variables--------------------------------------//

    var correctAnswers = 0;
    var highScore = 0;
    // var answer;
    var time = levelUp();
    var intervalId;
    var userSelection;

    // Starts the game
    function startGame() {
        intervalId = setInterval(countDown, 1000);
        mathProb();
    }
    // sets the timer and shortens the interval as the user adds more 
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

    // stops game when timer expires or user selects/enters incorrect answer. 
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

    // resets the timer on correct answer invoked by mathProb class
    function reset() {
        clearInterval(intervalId);
        $("#maths").empty();
        mathProb();
        time = levelUp();
        intervalId = setInterval(countDown, 1000);
    }

    // countDown timer, stops game when timer reaches 0.
    function countDown() {
        time--;
        $("#countdown").html("<h1 class='display-4'>"+time+"</h1>");
        if (time === 0) {
            stopGame();
            return;
        }
    }
// generates 2 random numbers 
    function mathProb() {
        $("#maths").empty();
        var numOne = Math.floor(Math.random() * 65) + 3;
        var numTwo = Math.floor(Math.random() * 67) + 3;

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
// A proper name for this would be answer or something.
// This calculates the solution. Subraction equations will not have negative solution values.
    function mathtastic(op, nOne, nTwo) {
        var mathyMath;
        if (op === 0) {
            if (nOne >= nTwo) {
                mathyMath = nOne - nTwo;
                return mathyMath;
            }
            else {
                mathyMath = nTwo - nOne;
                return mathyMath;
            }
        } else if (op === 1) {
            mathyMath = nOne + nTwo;
            return mathyMath;
        }
    }
// this displays the math problem and the inputs. 
// If you are smart enough, the quiz will change from multiple choice to number entry.
// 
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
// this randomizes the location of the correct answer. 
        if (correctAnswers < 10) {
// selects a number between 1 and 5 and adds it to the answer.
// loop will always reach the correct number
            var range = Math.floor(Math.random() * 5) + 1 + sol, nOne, nTwo;
            for (let i = 5; i >= 0; i--) {
// if the solution is < 5 this prevents negative answers from showing up because the solution will be >= 0
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
// DO MATH!!!!
    $("#start").click(function(){
        $("#startScreen").hide();
        $("#mathArea").attr("hidden", false);
        startGame();
    });
    
});