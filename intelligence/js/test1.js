/**
 * The module Test1 provides functions for the 1-X-2 questions.
 */
window.Test1 = (function () {
    "use strict";

    var content = document.getElementById('content');
    var test1h2 = "1. Tipsrunda";
    var test1Textp1 = "Det första deltestet går ut på att svara på fem 1-X-2-frågor. " +
        "Du måste svara på alla frågor. Lycka till!";

    var questionObjects = [];
    var questions = [
        "Vilket träd har inga löv?",
        "Hur många månader är det på 1,5 år?",
        "Var ligger Brasilien?",
        "Vem är Bamses kompis?",
        "Hur lång är en kilometer?"
    ];
    var options = [
        ["Lönn", "Lärkträd", "Bok"],
        [18, 12, 15],
        ["I Europa", "I Sydamerika", "I Asien"],
        ["Sture", "Pippi Långstrump", "Lille Skutt"],
        ["1000 m", "10 000 m", "1608 m"]
    ];
    var answers = [1, 0, 1, 2, 0];

    /* Question object */
    var question = {
        question: '',
        options: [],
        answerIndex: '',

        /**
         * Initializes the question object.
         *
         * @param string question The question
         * @param object options The array containing the answer options
         * @param number answerIndex The index of the correct answer
         *
         * @returns void
         */
        init: function(question, options, answerIndex) {
            this.question = question;
            this.options = options;
            this.answerIndex = answerIndex;
        },

        /**
         * Checks if the answer is correct.
         *
         * @param number index Button 1 has index 0, button 2 has index 1, ...
         * @param object button The pressed button
         *
         * @returns void
         */
        checkAnswer: function(index, button) {
            var newTextNode5, newp2;

            if (this.answerIndex === index) {
                window.console.log("Correct!");
                button.classList.add("correct");
                newTextNode5 = document.createTextNode("Rätt svar! " +
                    "Klicka för att gå vidare.");
                window.Test.testScore += 3;
            } else {
                window.console.log("Wrong answer.");
                button.classList.add("wrong");
                newTextNode5 = document.createTextNode("Fel svar. " +
                    "Rätt svar skulle vara " + this.options[this.answerIndex] +
                    ". Klicka för att gå vidare.");
            }
            newp2 = document.createElement("p");
            newp2.appendChild(newTextNode5);
            window.Test.currentElement.appendChild(newp2);
            disableButtons();
            test1.questionNbr++;
            window.console.log(test1.questionNbr + " frågor besvarade. Antal poäng: " +
                window.Test.testScore);

            /* Eventlistener added after a timeout so that it isn't triggered
            instantly by the button just clicked.*/
            setTimeout(function() {
                window.Test.currentElement.addEventListener("click", function() {
                    if (window.Test.currentTest === 1) {
                        if (test1.questionNbr < 5) {
                            window.Test1.runTest1();
                        } else {
                            window.Test.testResult();
                            test1.questionNbr = 0;
                        }
                    } else if (window.Test.currentTest === 2) {
                        window.Test.testResult();
                    }
                });
            }, 10);
        },
    };

    /**
     * Creates and returns an element that shows a question and some buttons
     * with the answer options.
     *
     * @param object questionObject The question object
     *
     * @returns object The question element
     */
    function getNewQuestion(questionObject) {
        var newElement = document.createElement("div");
        var newp1 = document.createElement("p");
        var button1 = document.createElement("button");
        var buttonX = document.createElement("button");
        var button2 = document.createElement("button");
        var newTextNode0 = document.createTextNode(questionObject.question);
        var newTextNode1 = document.createTextNode(questionObject.options[0]);
        var newTextNode2 = document.createTextNode(questionObject.options[1]);
        var newTextNode3 = document.createTextNode(questionObject.options[2]);

        newp1.appendChild(newTextNode0);
        button1.appendChild(newTextNode1);
        buttonX.appendChild(newTextNode2);
        button2.appendChild(newTextNode3);
        newElement.appendChild(newp1);
        newElement.appendChild(button1);
        newElement.appendChild(buttonX);
        newElement.appendChild(button2);
        content.appendChild(newElement);
        newElement.className = "question";
        button1.className = "button";
        buttonX.className = "button";
        button2.className = "button";
        button1.addEventListener("click", function() {
            questionObject.checkAnswer(0, button1);
        });
        buttonX.addEventListener("click", function() {
            questionObject.checkAnswer(1, buttonX);
        });
        button2.addEventListener("click", function() {
            questionObject.checkAnswer(2, button2);
        });

        // Extra button for fizz buzz
        if (questionObject.options.length > 3) {
            var button4 = document.createElement("button");
            var newTextNode4 = document.createTextNode(questionObject.options[3]);

            button4.appendChild(newTextNode4);
            button4.className = "button";
            newElement.appendChild(button4);
            button4.addEventListener("click", function() {
                questionObject.checkAnswer(3, button4);
            });
        }

        return newElement;
    }

    /**
     * Disables all answer buttons.
     *
     * @returns void
     */
    function disableButtons() {
        var allButtons = document.getElementsByTagName('button');

        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].classList.add("disabled");
        }
    }

    /**
     * Runs test 1. Shows the next question.
     *
     * @returns void
     */
    function runTest1() {
        content.removeChild(window.Test.currentElement);
        window.Test.currentElement = getNewQuestion(questionObjects[test1.questionNbr]);
    }

    var test1 = {

        questionNbr: 0,

        /**
         * Presents test 1. Applies an event listener to enable moving on
         * to test 1.
         *
         * @returns void
         */
        initTest1: function() {
            window.Test.currentTest = 1;
            content.removeChild(window.Test.currentElement);
            window.Test.currentElement = window.Test.getNewElement(test1h2, test1Textp1);
            window.Test.currentElement.addEventListener("click", runTest1);
        },

        question: question,
        getNewQuestion: getNewQuestion,
        runTest1: runTest1
    };

    /* Create questions */
    for (let i = 0; i < 5; i++) {
        questionObjects[i] = Object.create(question);
    }

    /* Initialize questions */
    for (let i = 0; i < 5; i++) {
        questionObjects[i].init(questions[i], options[i], answers[i]);
    }

    // Return the object to make it possible to use.
    return test1;
})();
