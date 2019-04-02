/**
 * The module Test2 provides functions for the FizzBuzz test.
 */
window.Test2 = (function () {
    "use strict";

    var content = document.getElementById('content');
    var test2h2 = "2. FizzBuzz";
    var test2Textp1 = "Det andra testet går ut på att ange fortsättningen på " +
        "en sekvens av spelet FizzBuzz. Sekvensen börjar på ett heltal och " +
        "fortsätter därefter uppåt. Varje tal som är delbart med 3 ersätts dock med " +
        "fizz och varje tal som är delbart med 5 ersätts med buzz. Tal som är delbara " +
        "med både 3 och 5 blir fizz buzz.";

    /**
     * Creates and returns a FizzBuzz question.
     *
     * @returns object The FizzBuzz question
     */
    function getFizzBuzzQuestion() {
        var fizzBuzzQuestion = Object.create(window.Test1.question);
        var start = 1070 + Math.floor(Math.random() * Math.floor(31));   // 1070-1100
        var fizzBuzzObj = fizzBuzz(start);

        fizzBuzzQuestion.init(fizzBuzzObj.resultStr, fizzBuzzObj.options, fizzBuzzObj.answerIndex);

        return fizzBuzzQuestion;
    }

    /**
     * Creates and returns an object that contains what is needed to make a
     * FizzBuzz question: a question, the options and the answer index.
     *
     * @param number start The start value
     *
     * @returns object An object describing the FizzBuzz question
     */
    function fizzBuzz(start) {
        var resultStr = "Hur fortsätter fizzbuzz-serien ";
        var stop = start + 10;
        var next, options, answerIndex;

        var fizzBuzzItem = function(i) {
            if (i % 3 == 0 && i % 5 == 0) {
                return "Fizz Buzz";
            } else if (i % 3 == 0) {
                return "Fizz";
            } else if (i % 5 == 0) {
                return "Buzz";
            } else {
                return i;
            }
        };

        for (let i = start; i <= stop; i++) {
            resultStr += fizzBuzzItem(i);
            if (i < stop) {
                resultStr += ", ";
            }
        }
        resultStr += "...?";
        next = fizzBuzzItem(stop + 1);
        options = [stop + 1, "Fizz", "Buzz", "Fizz Buzz"];
        answerIndex = options.indexOf(next);
        //console.log("Next " + next);

        return {resultStr: resultStr, options: options, answerIndex: answerIndex};
    }

    /**
     * Runs test 2. Shows the FizzBuzz question.
     *
     * @returns void
     */
    function runTest2() {
        content.removeChild(window.Test.currentElement);
        window.Test.currentElement = window.Test1.getNewQuestion(getFizzBuzzQuestion());
    }

    var test2 = {

        /**
         * Presents test 2. Applies an event listener to enable moving on
         * to test 2.
         *
         * @returns void
         */
        initTest2: function() {
            window.Test.currentTest = 2;
            content.removeChild(window.Test.currentElement);
            window.Test.currentElement = window.Test.getNewElement(test2h2, test2Textp1);
            window.Test.currentElement.addEventListener("click", runTest2);
        }
    };

    // Return the object to make it possible to use.
    return test2;
})();
