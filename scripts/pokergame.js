var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var suits = ["C", "D", "H", "S"];
var cardsValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var msg = "";
var msgEnd = "";

var cardsHand = [];

/**
 * Creates a deck of 52 cards
 * @param {Array} suits - array of 4 suits
 * @param {Array} cards - array of 13 cards
 * @param {Array} cardsValue - array of the value of the cards
 * @returns Array of objects
 */
function createDeck(suits, cards, cardsValue) {
    var deck = [];

    suits.forEach(suit => {
        for (var i = 0; i < cards.length; i++) {
            let card = cards[i];
            let cardValue = cardsValue[i];
            deck.push({ suit, card, cardValue });
        }
    });

    return deck;
}

var deckCards = createDeck(suits, cards, cardsValue);

/**
 * Create the hand of the gamer random
 * After 10 games the cards are over
 */
function createHand() {
    var index;

    for (var i = 0; i < 5; i++) {
        cardsHand[i] = deckCards[Math.floor(Math.random() * deckCards.length)];

        // takes the index of the card in the deck
        index = deckCards.findIndex(obj => obj.card === cardsHand[i].card && obj.suit === cardsHand[i].suit);
        // Remove the card from the deck
        deckCards.splice(index, 1);
    }
}

/**
 * Checks if the hand is a Flush
 * @returns {boolean} isFlush
 */
function isFlush() {
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
 * Checks if the array is ordered
 * @param {Array} arr 
 * @returns {Boolean} 
 */
function checkConsecutiveCards(arr) {
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
 * @returns {Object} return an object with the value of the card and the number of occurences
 */
function checkOccurences(arr) {
    return arr.reduce((prev, curr) => (prev[curr.card] = ++prev[curr.card] || 1, prev), {});
}

/**
 * Get the max value of the cards 
 * @param {Array} array - array of objects 
 * @return {Object} object with the max value
 */
function getHighCard(array) {
    return array.reduce((prev, current) => (prev.card > current.card) ? prev : current);
}

/**
 * Check the hand of the gamer
 */
function checkPoker() {

    var isTris = 0;
    var isDouble = 0;

    sortsArray(cardsHand);

    // If the cards have the same suit
    if (isFlush()) {

        if (checkConsecutiveCards(cardsHand)) {
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

        // count the occurences of the card
        var resOccurences = Object.values(checkOccurences(cardsHand));

        // Four cards of the same rank
        if (resOccurences.some(val => val === 4)) {
            msg = "Four of a Kind";
        }

        resOccurences.forEach(function(item) {
            // Three cards of the same rank
            if (item === 3) {
                isTris = 1;
            } else if (item == 2) {
                // Check the Pairs
                isDouble += 1;
            }
        });

        if (isTris == 1 && isDouble == 1) {
            // Three of a Kind combined with a Pair
            msg = "Full House";
        } else if (checkConsecutiveCards(cardsHand)) {
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

        // No other hand applies, there aren't occurences
        if (resOccurences.every(val => val === 1)) {

            var max = getHighCard(cardsHand);

            msg = "High Card : " + max.cardValue;
        }
    }
}

/**
 * Display the Hand on the page
 */
function displayHand() {

    var hand = [];
    for (i = 0; i < cardsHand.length; i++) {

        hand[i] = cardsHand[i].cardValue + cardsHand[i].suit + ".png";
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

    var countRemainingCards = deckCards.length;

    if (countRemainingCards > 2) {
        displayHand();
        checkPoker();
    } else {
        msgEnd = "The game is ended";
        document.getElementById("playBtn").disabled = true;
        document.getElementById("restartBtn").style.display = "block";
    }
    document.getElementById("remainingCards").innerHTML = "Remaining " + countRemainingCards + " cards <b>" + msgEnd + "</b>";
    document.getElementById("result").innerHTML = msg;
}

/**
 * Restart the game
 */
function restart() {
    window.location.reload();
}