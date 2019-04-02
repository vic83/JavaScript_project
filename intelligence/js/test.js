/**
 * The module Test provides functions for a set of intelligence tests.
 */
window.Test = (function () {
    "use strict";

    var content = document.getElementById('content');
    var welcomeh2 = "Redo att börja?";
    var welcomeTextp1 = "Välkommen till Intelligence intelligenstest. Du kommer " +
        "nu att få göra fem olika uppgifter som används för att uppskatta din " +
        "intelligens.";
    var moveOnTextp2 = "Klicka för att gå vidare.";
    var totalScore = [];
    var maxPoints = [15, 3, 9, 10, 10];

    /**
     * Creates and returns an element that decribes the coming test. It is a
     * box with text and background color.
     *
     * @param string newTexth2 Header for the box
     * @param string newTextp1 Test description or welcome message
     * @param object listElement List element <ul> needed for test 5. Set to
     * 0 for other tests, or skip.
     *
     * @returns object The new element
     */
    function getNewElement(newTexth2, newTextp1, listElement) {
        var newElement = document.createElement("div");
        var newh2 = document.createElement("h2");
        var newp1 = document.createElement("p");
        var newp2 = document.createElement("p");
        var newTextNode0 = document.createTextNode(newTexth2);
        var newTextNode1 = document.createTextNode(newTextp1);
        var newTextNode2 = document.createTextNode(moveOnTextp2);

        newh2.appendChild(newTextNode0);
        newp1.appendChild(newTextNode1);
        newp2.appendChild(newTextNode2);
        newElement.appendChild(newh2);
        newElement.appendChild(newp1);

        if (listElement) {
            newElement.appendChild(listElement);
        }

        newElement.appendChild(newp2);
        content.appendChild(newElement);
        newElement.className = "info";

        return newElement;
    }

    /**
     * Creates and returns an element that decribes the result for the current test.
     * It is a box with text, points, and background color.
     *
     * @returns object The new element
     */
    function getNewResult() {
        var newElement = document.createElement("div");
        var newh2 = document.createElement("h2");
        var newp1 = document.createElement("p");
        var newp2 = document.createElement("p");
        var newp3 = document.createElement("p");
        var newTextNode0 = document.createTextNode("Resultat deltest " + test.currentTest);
        var newTextNode1 = document.createTextNode("Din poäng: " + test.testScore);
        var newTextNode2 = document.createTextNode("Maxpoäng: " + maxPoints[test.currentTest - 1]);
        var newTextNode3 = document.createTextNode(moveOnTextp2);

        newh2.appendChild(newTextNode0);
        newp1.appendChild(newTextNode1);
        newp2.appendChild(newTextNode2);
        newp3.appendChild(newTextNode3);
        newElement.appendChild(newh2);
        newElement.appendChild(newp1);
        newElement.appendChild(newp2);
        newElement.appendChild(newp3);
        content.appendChild(newElement);
        newElement.className = "result";

        return newElement;
    }

    /**
     * Creates and returns an element that decribes the final result for the complete
     * test. It is a box with text, points, and background color.
     *
     * @returns object The new element
     */
    function getFinalResult() {
        var totalMaxPoints = sumArray(maxPoints);
        var totalPoints = sumArray(totalScore);
        var percent = Math.round(1000 * totalPoints/totalMaxPoints * 10)/100;
        var newElement = document.createElement("div");
        var newh2 = document.createElement("h2");
        var newp1 = document.createElement("p");
        var newp2 = document.createElement("p");
        var newp3 = document.createElement("p");
        var newp4 = document.createElement("p");
        var newTextNode0 = document.createTextNode("Sammanlagt resultat");
        var newTextNode1 = document.createTextNode("Din poäng: " + totalPoints);
        var newTextNode2 = document.createTextNode("Maxpoäng: " + totalMaxPoints);
        var newTextNode3 = document.createTextNode("Din intelligens är ");
        var newTextNode4 = document.createTextNode(`${percent} %`);

        newh2.appendChild(newTextNode0);
        newp1.appendChild(newTextNode1);
        newp2.appendChild(newTextNode2);
        newp3.appendChild(newTextNode3);
        newp4.appendChild(newTextNode4);
        newElement.appendChild(newh2);
        newElement.appendChild(newp1);
        newElement.appendChild(newp2);
        newElement.appendChild(newp3);
        newElement.appendChild(newp4);
        content.appendChild(newElement);
        newElement.className = "result";
        newp4.className = "big";

        return newElement;
    }

    /**
     * Calculates and returns the sum of the array elements.
     *
     * @param object array The array that will be summarized
     *
     * @returns number The sum of the array
     */
    function sumArray(array) {
        return array.reduce((a, b) => a + b, 0);
    }

    /**
     * Calls the getNewResult() function to show the test result and applies an
     * event listener to enable moving on to the next test. Updates testScore
     * and totalScore.
     *
     * @returns void
     */
    function testResult() {
        content.removeChild(test.currentElement);
        test.currentElement = getNewResult();
        test.currentElement.addEventListener("click", function() {
            if (test.currentTest === 1) {
                window.Test2.initTest2();
            } else if (test.currentTest === 2) {
                window.Test3.initTest3();
            } else if (test.currentTest === 3) {
                window.Test4.initTest4();
            } else if (test.currentTest === 4) {
                window.Test5.initTest5();
            } else {
                content.removeChild(test.currentElement);
                test.currentElement = getFinalResult();
            }
        });
        totalScore[test.currentTest - 1] = test.testScore;
        test.testScore = 0;
        console.log("Totalpoäng: " + sumArray(totalScore));
    }

    var test = {

        testScore: 0,
        currentElement: '',
        currentTest: '',

        /**
         * Shows the welcome text. Applies an event listener to enable moving on
         * to test 1.
         *
         * @returns void
         */
        init: function() {
            this.currentElement = getNewElement(welcomeh2, welcomeTextp1);
            this.currentElement.addEventListener("click", function() {
                window.Test1.initTest1();
            });
        },

        /**
         * Resets the current test.
         *
         * @returns void
         */
        reset: function() {
            this.testScore = 0;
            if (this.currentTest === 1) {
                window.Test1.questionNbr = 0;
                window.Test1.initTest1();
            } else if (this.currentTest === 2) {
                window.Test1.questionNbr = 0;
                window.Test2.initTest2();
            } else if (this.currentTest === 3) {
                window.Test3.initTest3();
            } else if (this.currentTest === 4) {
                window.Test4.initTest4();
            } else {
                window.Test5.initTest5();
            }
        },

        testResult: testResult,
        getNewElement: getNewElement
    };

    // Return the object to make it possible to use.
    return test;
})();
