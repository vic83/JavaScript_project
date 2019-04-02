/**
 * The module Test4 provides functions for the visual ability test.
 */
window.Test4 = (function () {
    "use strict";

    var content = document.getElementById('content');
    var test4h2 = "4. Visuell förmåga och läsförståelse";
    var test4Textp1 = "Det fjärde testet går ut på att i rätt ordning klicka på " +
        "rätt färg och form. På nästa sida kommer du att få se 10 unika objekt, " +
        "samt en numrerad lista som beskriver i vilken ordning du ska klicka på dem. " +
        "Du har 15 sekunder på dig. Lycka till!";

    var shapeObjects = [];
    var shapeOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var descriptions = [
        "Den röda fyrkanten.",
        "Den gröna cirkeln.",
        "Den blåa rektangeln.",
        "Den gula triangeln.",
        "Den röda cirkeln.",
        "Den orangea triangeln.",
        "Den gula cirkeln.",
        "Den blåa kvadraten.",
        "Den gröna triangeln.",
        "Den orangea rektangeln.",
    ];
    var colors = [
        "red",
        "green",
        "blue",
        "yellow",
        "red",
        "orange",
        "yellow",
        "blue",
        "green",
        "orange"
    ];
    var shapes = [
        "square",
        "circle",
        "rectangle",
        "triangle",
        "circle",
        "triangle",
        "circle",
        "square",
        "triangle",
        "rectangle"
    ];

    /* Shape object */
    var shape = {
        description: '',
        color: '',
        shape: '',

        /**
         * Initializes the shape object.
         *
         * @param string description The description of the object
         * @param string color The color
         * @param string shape The shape
         *
         * @returns void
         */
        init: function(description, color, shape) {
            this.description = description;
            this.color = color;
            this.shape = shape;
        }
    };

    /**
     * Creates and returns an element that shows the shape test.
     *
     * @returns object The shape test element
     */
    function getShapeTest() {
        var newElement, orderedList, listItem, newTextNode, counter, countNode;
        var shapeTable, tableRow, tableData, shapeNode, progressBar, rightElement;
        var shapeNbr = 1, guessNbr = 1;
        var shapeObj;

        window.Test3.shuffleArray(shapeOrder);

        newElement = document.createElement("div");
        rightElement = document.createElement("div");
        orderedList = document.createElement("ol");
        shapeTable = document.createElement("table");
        counter = document.createElement("p");

        console.log(shapeOrder);

        for (let i = 0; i < shapeObjects.length; i++) {
            listItem = document.createElement("li");
            newTextNode = document.createTextNode(shapeObjects[i].description);
            listItem.appendChild(newTextNode);
            orderedList.appendChild(listItem);
        }

        for (let i = 0; i < 2; i++) {
            tableRow = document.createElement("tr");
            for (let j = 0; j < 5; j++) {
                tableData = document.createElement("td");
                shapeNode = document.createElement("div");
                shapeNode.id = shapeOrder[shapeNbr - 1] + 1;
                shapeObj = shapeObjects[shapeOrder[shapeNbr - 1]];
                shapeNode.className = "shape " + shapeObj.color + " " + shapeObj.shape;
                if (shapeObj.shape === "triangle") {
                    shapeNode.style.borderBottomColor = shapeObj.color;
                }

                tableData.appendChild(shapeNode);
                tableRow.appendChild(tableData);

                shapeNode.addEventListener("click", function(event) {
                    if (shapeObjects[event.target.id - 1].description ===
                            shapeObjects[guessNbr - 1].description) {
                        window.console.log("Correct!");
                        window.Test.testScore++;
                    } else {
                        window.console.log("Wrong.");
                    }
                    guessNbr++;
                    counter.innerHTML = `Klicka på nr ${guessNbr} på listan.`;

                    if (guessNbr === 11) {
                        gameOver(counter);
                    }
                });
                shapeNbr++;
            }
            shapeTable.appendChild(tableRow);
        }

        orderedList.className = "list";
        newElement.className = "center";
        rightElement.className = "rightElement";

        countNode = document.createTextNode(`Klicka på nr ${guessNbr} på listan.`);
        counter.appendChild(countNode);

        rightElement.appendChild(shapeTable);
        rightElement.appendChild(counter);
        progressBar = window.Test3.getProgressBar(150);
        rightElement.appendChild(progressBar);
        newElement.appendChild(orderedList);
        newElement.appendChild(rightElement);
        content.appendChild(newElement);
        rightElement.style.width = shapeTable.offsetWidth + "px";

        setTimeout(function() {
            progressBar.firstChild.style.backgroundColor = "white";
            gameOver(counter);
        }, 15000);

        return newElement;
    }

    /**
     * Disables all shape objects (td elements). Adds an event listener to make
     * it possible to move on to the test results.
     *
     * @returns void
     */
    function gameOver(counter) {
        var allTableDataElements = document.getElementsByTagName('td');

        for (let i = 0; i < allTableDataElements.length; i++) {
            allTableDataElements[i].style.pointerEvents = 'none';
        }

        counter.innerHTML = "Spelet är slut. Klicka för att gå vidare.";
        setTimeout(function() {
            window.Test.currentElement.addEventListener("click", function() {
                window.Test.testResult();
            });
        }, 10);
    }

    /**
     * Runs test 4. Shows the shape test.
     *
     * @returns void
     */
    function runTest4() {
        content.removeChild(window.Test.currentElement);
        window.Test.currentElement = getShapeTest();
    }

    var test4 = {

        /**
         * Presents test 4. Applies an event listener to enable moving on
         * to test 4.
         *
         * @returns void
         */
        initTest4: function() {
            window.Test.currentTest = 4;
            content.removeChild(window.Test.currentElement);
            window.Test.currentElement = window.Test.getNewElement(test4h2, test4Textp1, 0);
            window.Test.currentElement.addEventListener("click", runTest4);
        },

        shapeObjects: shapeObjects,
        shapeOrder: shapeOrder
    };

    /* Create shapes */
    for (let i = 0; i < 10; i++) {
        shapeObjects[i] = Object.create(shape);
    }

    /* Initialize shapes */
    for (let i = 0; i < 10; i++) {
        shapeObjects[i].init(descriptions[i], colors[i], shapes[i]);
    }

    // Return the object to make it possible to use.
    return test4;
})();
