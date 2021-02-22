var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var suits = ["C", "D", "H", "S"];
var msg = "";
var msgEnd = "";

var cardsHand = [];

var isFinished = false;

// TODO: Add values in the deck, as K, Q, J, A
/**
 * Creates a deck of 52 cards
 * @param {Array} suits - array of 4 suits
 * @param {Array} cards - array of 13 cards
 * @returns Array of objects
 */
function createDeck(suits, cards) {
    var deck = [];

    suits.forEach(suit => {
        cards.forEach(card => {
            deck.push({ suit, card });
        });
    });

    return deck;
}

// TODO: Remember to check if it is not possible to call the function in playGame function 
var deckCards = createDeck(suits, cards);

/**
 * Create the hand of the gamer random
 * After 10 games the cards are over
 */
function createHand() {
    var index;
    // TODO: Create a copy of the deck?
    // Checks if the deck is not over
    //if (deckCards.length > 2) {
    for (var i = 0; i < 5; i++) {
        cardsHand[i] = deckCards[Math.floor(Math.random() * deckCards.length)];

        // takes the index of the card in the deck
        index = deckCards.findIndex(obj => obj.card === cardsHand[i].card && obj.suit === cardsHand[i].suit);
        // Remove the card from the deck
        deckCards.splice(index, 1);
    }
    //} else {
    //    document.getElementById("result").innerHTML = "The cards are over!"
    // }
}

/**
 * Checks if the hand is a Flush
 * @returns {boolean} isFlush
 */
function isFlush() {
    /*cardsHand = [
        { suit: "C", card: 8 },
        { suit: "C", card: 9 },
        { suit: "C", card: 2 },
        { suit: "C", card: 8 },
        { suit: "C", card: 13 }
    ];*/
    return cardsHand.every(obj => obj.suit === cardsHand[0].suit);
}

/**
 * Sorts the array
 * @param {Array} array 
 */
function sortsArray(array) {
    array.sort(function(a, b) {
        return a.card - b.card;
    });
}

/**
 * Check the hand of the gamer
 */
function checkPoker() {

    var isTris = 0;
    var isDouble = 0;
    msg = "";

    /*cardsHand = [
        { suit: "C", card: 11 },
        { suit: "C", card: 12 },
        { suit: "C", card: 10 },
        { suit: "C", card: 13 },
        { suit: "C", card: 14 }
    ];*/

    sortsArray(cardsHand);

    // If the cards have the same suit
    if (isFlush()) {

        if (checkOrder(cardsHand)) {
            // Ten to Ace of the same suit
            if (cardsHand[0].card === 10) {
                msg = "Royal Flush";
            } else {
                // Five consecutive cards of the same suit
                msg = "Straight Flush"
            }
        } else {
            // Five cards of the same suit
            msg = "Flush";
        }
    } else {

        // TODO: Refactor the rest of the function
        console.log(cardsHand);
        var occurences = checkOccurences(cardsHand);

        console.log(Object.values(occurences));

        var resOccurences = Object.values(occurences);

        for (i = 0; i < resOccurences.length; i++) {
            // Four cards of the same rank
            if (resOccurences[i] == 4) {
                msg = "Four of a King";
                break;
            }

            // Three cards of the same rank
            if (resOccurences[i] == 3) {
                isTris = 1;
            }

            // For the Pairs
            if (resOccurences[i] == 2) {
                isDouble += 1;
            }
        }

        if (isTris == 1 && isDouble == 1) {
            // Three of a Kind combined with a Pair
            msg = "Full House";
        } else if (cardsHand[0].card === 10 || checkOrder(cardsHand)) {
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

            var max = getHighCard(cardsHand);

            switch (max.card) {
                case 11:
                    msg = "High Card : J";
                    break;
                case 12:
                    msg = "High Card : Q";
                    break;
                case 13:
                    msg = "High Card : K";
                    break;
                case 14:
                    msg = "High Card: A";
                    break;
                default:
                    msg = "High Card : " + max.card;
                    break;
            }

        }
        console.log(msg);
    }
}

/**
 * Checks if the array is ordered
 * @param {Array} arr 
 */
function checkOrder(arr) {
    var isOrdered = true;

    for (i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1].card !== (arr[i].card + 1)) {
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

    return arr.reduce((prev, curr) => (prev[curr.card] = ++prev[curr.card] || 1, prev), {});

}

/**
 * Get the max value of the cards 
 * @param {Array} array - array of objects 
 */
function getHighCard(array) {
    return array.reduce((prev, current) => (prev.card > current.card) ? prev : current);
}

/**
 * Display the Hand on the page
 */
function displayHand() {

    var hand = [];
    for (i = 0; i < cardsHand.length; i++) {

        if (cardsHand[i].card == 11) {
            hand[i] = "J" + cardsHand[i].suit + ".png";
        } else if (cardsHand[i].card == 12) {
            hand[i] = "Q" + cardsHand[i].suit + ".png";
        } else if (cardsHand[i].card == 13) {
            hand[i] = "K" + cardsHand[i].suit + ".png";
        } else if (cardsHand[i].card == 14) {
            hand[i] = "A" + cardsHand[i].suit + ".png";
        } else {
            hand[i] = cardsHand[i].card + cardsHand[i].suit + ".png";
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
    checkPoker();
    displayHand();

    /*if (msgEnd == "") {
        displayHand();
        checkPoker();
    } else {
        document.getElementById("end").innerHTML = msgEnd;
    }*/

    document.getElementById("result").innerHTML = msg;
}