var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var suits = ["C", "D", "H", "S"];
var msg = "";

var suitsHand = [];
var cardsHand = [];

/**
 * Create random the hand of the gamer
 */
function createHand() {

    for (i = 0; i < 5; i++) {
        suitsHand[i] = suits[Math.floor(Math.random() * suits.length)];
        cardsHand[i] = cards[Math.floor(Math.random() * cards.length)];
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
        if (cardsHand[0] == 1 && cardsHand[1] == 10) {
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

        var result = checkOccurances(cardsHand);

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
        } else if ((cardsHand[0] == 1 && cardsHand[1] == 10) || checkOrder(cardsHand)) {
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
 * Checks the occurances in the array
 * @param {Array} arr 
 */
function checkOccurances(arr) {

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

/**
 * Play the game
 */
function playGame() {
    createHand();
    displayHand();
    checkPoker();
    document.getElementById("result").innerHTML = msg;
}