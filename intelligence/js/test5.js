/**
 * The module Test5 provides functions for the apprehension test.
 */
window.Test5 = (function () {
    "use strict";

    var content = document.getElementById('content');
    var test5h2 = "5. Uppfattningsförmåga";
    var test5Textp1 = "Det femte testet går ut på att snabbt bestämma sig för om " +
        "man ska klicka på ett objekt eller inte. 10 st objekt visas ett i taget " +
        "och du ska inom 1 sekund klicka på alla objekt som: ";
    var instructions = [
        "Har en annan färg än röd.",
        "Har en annan form än kvadrat.",
        "Är röd och kvadrat."
    ];

    /**
     * Creates and returns an unordered list element.
     *
     * @returns object The list element
     */
    function getListElement() {
        var unorderedList = document.createElement("ul");
        var listItem, textNode;

        for (let i = 0; i < instructions.length; i++) {
            listItem = document.createElement("li");
            textNode = document.createTextNode(instructions[i]);
            listItem.appendChild(textNode);
            unorderedList.appendChild(listItem);
        }

        return unorderedList;
    }

    /**
     * Creates and returns an element that shows the apprehension test.
     *
     * @returns object The apprehension test element
     */
    function getApprehensionTest() {
        var newElement = document.createElement("div");
        var textNode = document.createTextNode("Spelet är slut. Klicka för att gå vidare.");
        var shapeObjects = window.Test4.shapeObjects;
        var shapeObj, shapeNode;

        window.Test3.shuffleArray(window.Test4.shapeOrder);
        newElement.className = "apprehension";
        content.appendChild(newElement);

        for (let i = 0; i < shapeObjects.length; i++) {
            setTimeout(function() {
                shapeNode = document.createElement("div");
                shapeObj = shapeObjects[window.Test4.shapeOrder[i]];
                shapeNode.className = "bigshape " + shapeObj.color + " big" + shapeObj.shape;
                if (shapeObj.shape === "triangle") {
                    shapeNode.style.borderBottomColor = shapeObj.color;
                }

                newElement.appendChild(shapeNode);
                shapeNode.addEventListener("click", function() {
                    window.Test.testScore++;
                    window.console.log("Correct!");
                    this.style.pointerEvents = 'none';
                });

                setTimeout(function() {
                    newElement.removeChild(shapeNode);
                }, 1000);
            }, 1000 * (2 * i + 1));
        }

        setTimeout(function() {
            newElement.appendChild(textNode);
            newElement.addEventListener("click", function() {
                window.Test.testResult();
            });
        }, 21000);

        return newElement;
    }

    /**
     * Runs test 5. Shows the apprehension test.
     *
     * @returns void
     */
    function runTest5() {
        content.removeChild(window.Test.currentElement);
        window.Test.currentElement = getApprehensionTest();
    }

    var test5 = {

        /**
         * Presents test 5. Applies an event listener to enable moving on
         * to test 5.
         *
         * @returns void
         */
        initTest5: function() {
            window.Test.currentTest = 5;
            content.removeChild(window.Test.currentElement);
            window.Test.currentElement = window.Test.getNewElement(test5h2,
                test5Textp1, getListElement());
            window.Test.currentElement.addEventListener("click", runTest5);
        }
    };

    // Return the object to make it possible to use.
    return test5;
})();
