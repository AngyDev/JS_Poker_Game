var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var cardsC = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var cardsD = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var cardsH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var cardsS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var suits = ["C", "D", "H", "S"];
var msg = "";
var msgEnd = "";

var suitsHand = [];
var cardsHand = [];

var suitsC = 13;
var suitsD = 13;
var suitsH = 13;
var suitsS = 13;
var isFinished = false;

/**
 * Create random the hand of the gamer
 */
function createHand() {

    for (i = 0; i < 5; i++) {
        if (suitsC == 0) {
            suits = suits.filter(function(item) { return item !== "C" });
        }
        if (suitsD == 0) {
            suits = suits.filter(function(item) { return item !== "D" });
        }
        if (suitsH == 0) {
            suits = suits.filter(function(item) { return item !== "H" });
        }
        if (suitsS == 0) {
            suits = suits.filter(function(item) { return item !== "S" });
        }

        if (suits.length == 1) {
            if (suitsC >= 5 || suitsD >= 5 || suitsH >= 5 || suitsS >= 5) {
                suitsHand[i] = suits[0];
            } else {
                isFinished = true;
                break;
            }
        } else {
            suitsHand[i] = suits[Math.floor(Math.random() * suits.length)];
        }

        if (suitsHand[i] == "C") {
            suitsC -= 1;
        } else if (suitsHand[i] == "D") {
            suitsD -= 1;
        } else if (suitsHand[i] == "H") {
            suitsH -= 1;
        } else if (suitsHand[i] == "S") {
            suitsS -= 1;
        }
    }

    if (!isFinished) {

        suitsHand.sort();

        for (i = 0; i < 5; i++) {

            if (suitsHand[i] == "C") {
                cardsHand[i] = cardsC[Math.floor(Math.random() * cardsC.length)];
                cardsC.splice(cardsC.indexOf(cardsHand[i]), 1);
            } else if (suitsHand[i] == "D") {
                cardsHand[i] = cardsD[Math.floor(Math.random() * cardsD.length)];
                cardsD.splice(cardsD.indexOf(cardsHand[i]), 1);
            } else if (suitsHand[i] == "H") {
                cardsHand[i] = cardsH[Math.floor(Math.random() * cardsH.length)];
                cardsH.splice(cardsH.indexOf(cardsHand[i]), 1);
            } else if (suitsHand[i] == "S") {
                cardsHand[i] = cardsS[Math.floor(Math.random() * cardsS.length)];
                cardsS.splice(cardsS.indexOf(cardsHand[i]), 1);
            }
        }
    } else {
        msgEnd = "The cards are over";
    }
}

/**
 * Check the hand of the gamer
 */
function checkPoker() {

    var isTris = 0;
    var isDouble = 0;
    var isDiff = false;
    msg = "";

    // Sort the array of the cards
    cardsHand.sort(
        function(a, b) {
            return a - b;
        }
    );

    suitsHand.sort();
    // Check the suit
    for (i = 0; i < suitsHand.length; i++) {
        if (suitsHand[i] != suitsHand[0]) {
            isDiff = true;
            break;
        }
    }

    // If the cards have the same suit
    if (!isDiff) {

        // Ten to Ace of the same suit
        if (checkStraightAce(cardsHand)) {
            msg = "Royal Flush";
        } else {
            // Five consecutive cards of the same suit
            if (checkOrder(cardsHand)) {
                msg = "Straight Flush"
            }
        }

        // Five cards of the same suit
        if (msg == "") {
            msg = "Flush";
        }
    } else {

        var result = checkOccurences(cardsHand);

        for (i = 0; i < result.length; i++) {
            // Four cards of the same rank
            if (result[i] == 4) {
                msg = "Four of a King";
                break;
            }

            // Three cards of the same rank
            if (result[i] == 3) {
                isTris = 1;
            }

            // For the Pairs
            if (result[i] == 2) {
                isDouble += 1;
            }
        }

        if (isTris == 1 && isDouble == 1) {
            // Three of a Kind combined with a Pair
            msg = "Full House";
        } else if ((checkStraightAce(cardsHand)) || checkOrder(cardsHand)) {
            // Five consecutive cards
            msg = "Straight";
        } else if (isTris == 1 && isDouble == 0) {
            // Three cards of the same rank
            msg = "Three of a Kind"
        } else if (isDouble == 2) {
            // Two separate pairs
            msg = "Two Pair"
        } else if (isDouble == 1) {
            // Two cards of the same rank
            msg = "Pair";
        }

        // No other hand applies 
        if (msg == "") {
            var lastElement = cardsHand.length - 1;

            if (cardsHand[0] == 1) {
                msg = "High Card : A";
            } else {
                switch (cardsHand[lastElement]) {
                    case 11:
                        msg = "High Card : J";
                        break;
                    case 12:
                        msg = "High Card : Q";
                        break;
                    case 13:
                        msg = "High Card : K";
                        break;
                    default:
                        msg = "High Card : " + cardsHand[lastElement];
                        break;
                }
            }
        }
    }
}

/**
 * Checks if the array is a Straight with Ace
 * @param {Array} arr 
 */
function checkStraightAce(arr) {
    var straightAce = false;
    if (arr[0] == 1 && arr[1] == 10 && arr[2] == 11 && arr[3] == 12 && arr[4] == 13) return straightAce = true;
}

/**
 * Checks if the array is ordered
 * @param {Array} arr 
 */
function checkOrder(arr) {
    var isOrdered = true;

    for (i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] !== (arr[i] + 1)) {
            isOrdered = false;
            break;
        }
    }

    return isOrdered;
}

/**
 * Checks the occurences in the array
 * @param {Array} arr 
 */
function checkOccurences(arr) {

    var b = [];
    var prev;

    arr.sort(function(a, b) { return a - b; });

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = arr[i];
    }
    return b;
}

/**
 * Display the Hand on the page
 */
function displayHand() {

    var hand = [];
    for (i = 0; i < suitsHand.length; i++) {
        if (cardsHand[i] == 1) {
            hand[i] = "A" + suitsHand[i] + ".png";
        } else if (cardsHand[i] == 11) {
            hand[i] = "J" + suitsHand[i] + ".png";
        } else if (cardsHand[i] == 12) {
            hand[i] = "Q" + suitsHand[i] + ".png";
        } else if (cardsHand[i] == 13) {
            hand[i] = "K" + suitsHand[i] + ".png";
        } else {
            hand[i] = cardsHand[i] + suitsHand[i] + ".png";
        }
    }

    var yourHand = "<p> </p>";

    for (i = 0; i < hand.length; i++) {
        yourHand += '<img src="./img/' + hand[i] + '" width="200" height="350"/>';
    }

    yourHand += "<br/>";
    document.getElementById("displayHand").innerHTML = yourHand;
}

var click = 0;
/**
 * Play the game
 */
function playGame() {
    createHand();

    if (msgEnd == "") {
        displayHand();
        checkPoker();
    } else {
        document.getElementById("end").innerHTML = msgEnd;
    }

    document.getElementById("result").innerHTML = msg;
}