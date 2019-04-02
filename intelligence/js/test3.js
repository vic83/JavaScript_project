/**
 * The module Test3 provides functions for the memory test with flags.
 */
window.Test3 = (function () {
    "use strict";

    var content = document.getElementById('content');
    var test3h2 = "3. Minne";
    var test3Textp1 = "Det tredje testet går ut på att minnas det du ser. Under 5 sekunder " +
        "visas 9 flaggor, sedan försvinner de. Då visas en numrerad lista med namnen på de 9 " +
        "flaggorna. Du skall nu klicka på rätt ruta där motsvarande flagga ligger, i rätt " +
        "ordning. Så länge du gissar rätt får du fortsätta. När alla flaggor vänts upp eller " +
        "du gissar fel är testet över.";

    var flags = [];
    var flagSweden = '<div class="flag2-3 sverige"><div class="part1">' +
        '</div><div class="part2"></div></div>';
    var flagDenmark = '<div class="flag2-3 danmark"><div class="part1">' +
        '</div><div class="part2"></div></div>';
    var flagRomania = '<div class="flag2-3 romania"><div class="part1">' +
        '</div><div class="part2"></div></div>';
    var flagJapan = '<div class="flag2-3 japan"><div class="circle"></div></div>';
    var flagIvory = '<div class="flag2-3 elfenbenskusten"><div class="part1">' +
        '</div><div class="part2"></div></div>';

    /* Flag object */
    var flag = {

        name: '',        // name of the country
        flagHTML: '',    // HTML code for the flag

        /**
         * Initializes the flag object.
         *
         * @param string name The name
         * @param string flagHTML The HTML string
         *
         * @returns void
         */
        init: function(name, flagHTML) {
            this.name = name;
            this.flagHTML = flagHTML;
            //console.log(("Creating flag " + name + '.'));
        }
    };

    /**
     * Randomizes array element order in-place. Using Durstenfeld shuffle
     * algorithm.
     *
     * @param object array The array that shall be shuffled
     *
     * @returns void
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];

            array[i] = array[j];
            array[j] = temp;
        }
    }

    /**
     * Creates and returns a progress bar.
     *
     * @param number time The time interval for updating the progress bar
     *
     * @returns object The progress bar
     */
    function getProgressBar(time) {
        var progressBar = document.createElement("div");
        var progress = document.createElement("div");
        var width = 1;
        var id = setInterval(function() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                progress.style.width = width + '%';
            }
        }, time);

        progressBar.id = "progressBar";
        progress.id = "progress";
        progressBar.appendChild(progress);

        return progressBar;
    }

    /**
     * Turns all flags upside-down. Applies event listeners to make it possible
     * to look at the flags again, and verifies if the right flag has been turned.
     * Checks if the game is over, in that case all flags are disabled and another
     * event listener is added to enable moving on to the test result.
     *
     * @returns void
     */
    function hideFlags() {
        var flag, tableData, newp1, newTextNode;
        var allListElements = document.getElementsByTagName('li');
        var allTableDataElements = document.getElementsByTagName('td');
        var rightElement = document.getElementsByClassName('rightElement')[0];
        var guessNbr = 0;

        for (let i = 0; i < flags.length; i++) {
            tableData = document.getElementById(i + 1);
            flag = tableData.firstChild;
            flag.className = "flag2-3 upside-down";
            allListElements[i].innerHTML = flags[i].name;
            tableData.addEventListener("click", function(event) {
                if (flags[this.id - 1].name === flags[guessNbr].name) {
                    window.console.log("Correct!!");
                    if (++guessNbr === 9) {
                        window.console.log("You won it all, " + guessNbr + " points!");
                        newTextNode = document.createTextNode("Bra jobbat! " +
                            "Klicka för att gå vidare.");
                        newp1 = document.createElement("p");
                        newp1.appendChild(newTextNode);
                        rightElement.appendChild(newp1);
                        setTimeout(function() {
                            window.Test.currentElement.addEventListener("click", function() {
                                window.Test.testScore = guessNbr;
                                window.Test.testResult();
                            });
                        }, 10);
                    }
                } else {
                    window.console.log("Game over, " + guessNbr + " points.");
                    for (let i = 0; i < allTableDataElements.length; i++) {
                        allTableDataElements[i].style.pointerEvents = 'none';
                    }
                    newTextNode = document.createTextNode("Game over! " +
                        "Klicka för att gå vidare.");
                    newp1 = document.createElement("p");
                    newp1.appendChild(newTextNode);
                    rightElement.appendChild(newp1);
                    setTimeout(function() {
                        window.Test.currentElement.addEventListener("click", function() {
                            window.Test.testScore = guessNbr;
                            window.Test.testResult();
                        });
                    }, 10);
                }
                event.target.innerHTML = flags[i].flagHTML;
                this.style.pointerEvents = 'none';
            });
        }
    }

    /**
     * Creates and returns an element that shows the memory test.
     *
     * @returns object The memory test element
     */
    function getMemoryTest() {
        var newElement, orderedList, listItem, newTextNode;
        var flagTable, tableRow, tableData, progressBar, rightElement;
        var flagNbr = 1;
        var flagOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        shuffleArray(flagOrder);
        //console.log(flagOrder);

        newElement = document.createElement("div");
        rightElement = document.createElement("div");
        orderedList = document.createElement("ol");
        flagTable = document.createElement("table");

        for (let i = 0; i < flags.length; i++) {
            listItem = document.createElement("li");
            newTextNode = document.createTextNode("...");
            listItem.appendChild(newTextNode);
            orderedList.appendChild(listItem);
        }

        for (let i = 0; i < 3; i++) {
            tableRow = document.createElement("tr");
            for (let j = 0; j < 3; j++) {
                tableData = document.createElement("td");
                tableData.id = flagOrder[flagNbr - 1] + 1;
                tableData.innerHTML = flags[flagOrder[flagNbr - 1]].flagHTML;
                tableRow.appendChild(tableData);
                flagNbr++;
            }
            flagTable.appendChild(tableRow);
        }

        orderedList.className = "list";
        newElement.className = "center";
        rightElement.className = "rightElement";

        rightElement.appendChild(flagTable);
        progressBar = getProgressBar(50);
        rightElement.appendChild(progressBar);
        newElement.appendChild(orderedList);
        newElement.appendChild(rightElement);
        content.appendChild(newElement);

        setTimeout(function() {
            progressBar.firstChild.style.backgroundColor = "white";
            hideFlags();
        }, 5000);

        return newElement;
    }

    /**
     * Runs test 3. Shows the memory test.
     *
     * @returns void
     */
    function runTest3() {
        content.removeChild(window.Test.currentElement);
        window.Test.currentElement = getMemoryTest();
    }

    var test3 = {

        /**
         * Presents test 3. Applies an event listener to enable moving on
         * to test 3.
         *
         * @returns void
         */
        initTest3: function() {
            window.Test.currentTest = 3;
            content.removeChild(window.Test.currentElement);
            window.Test.currentElement = window.Test.getNewElement(test3h2, test3Textp1);
            window.Test.currentElement.addEventListener("click", runTest3);
        },

        shuffleArray: shuffleArray,
        getProgressBar: getProgressBar
    };

    /* Create flags */
    for (let i = 0; i < 9; i++) {
        flags[i] = Object.create(flag);
    }

    /* Initialize flags */
    flags[0].init('Sverige', flagSweden);
    flags[1].init('Danmark', flagDenmark);
    flags[2].init('Rumänien', flagRomania);
    flags[3].init('Japan', flagJapan);
    flags[4].init('Elfenbenskusten', flagIvory);
    flags[5].init('Sverige', flagSweden);
    flags[6].init('Danmark', flagDenmark);
    flags[7].init('Rumänien', flagRomania);
    flags[8].init('Japan', flagJapan);


    // Return the object to make it possible to use.
    return test3;
})();
