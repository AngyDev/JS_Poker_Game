var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var suits = ["C", "D", "H", "S"];
var cardsValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var countRemainingCards = 52;
var max = 0;

var score = {
    1: "High card",
    2: "Pair",
    3: "Two Pair",
    4: "Three of a Kind",
    5: "Straight",
    6: "Flush",
    7: "Full House",
    8: "Four of a Kind",
    9: "Straight Flush",
    10: "Royal Flush"
};

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

    countRemainingCards = deck.length;

    return deck;
}

var deckCards = createDeck(suits, cards, cardsValue);

/**
 * Create the hand of the player random
 */
function createHand() {
    var index;
    var cardsHand = [];

    for (var i = 0; i < 5; i++) {
        cardsHand[i] = deckCards[Math.floor(Math.random() * deckCards.length)];

        // takes the index of the card in the deck
        index = deckCards.findIndex(obj => obj.card === cardsHand[i].card && obj.suit === cardsHand[i].suit);
        // Remove the card from the deck
        deckCards.splice(index, 1);
    }
    countRemainingCards = deckCards.length;

    return cardsHand;
}

/**
 * Checks if the hand is a Flush
 * @param {Array} cardsHand - The cards of the player
 * @returns {boolean} isFlush
 */
function isFlush(cardsHand) {
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
 * @param {Array} array 
 * @returns {Boolean} 
 */
function checkConsecutiveCards(array) {
    var isOrdered = true;

    for (i = 0; i < array.length - 1; i++) {
        if (array[i + 1].card !== (array[i].card + 1)) {
            isOrdered = false;
            break;
        }
    }

    return isOrdered;
}

/**
 * Checks the occurences in the array
 * @param {Array} array 
 * @returns {Object} return an object with the value of the card and the number of occurences
 */
function checkOccurences(array) {
    return array.reduce((prev, curr) => (prev[curr.card] = ++prev[curr.card] || 1, prev), {});
}

/**
 * Gets the max value of the cards 
 * @param {Array} array - array of objects 
 * @return {Object} object with the max value
 */
function getHighCard(array) {
    return array.reduce((prev, current) => (prev.card > current.card) ? prev : current);
}

/**
 * Gets the sum of the cards
 * @param {Array} array
 * @returns {Number} The sum of the cards
 */
function getCardsSum(array) {
    return array.reduce((prev, curr) => prev + curr.card, 0);
}

/**
 * Check the hand of the player
 * @param {Array} cardsHand - The cards of the player
 * @returns an object that represents the player with the value of the hand and the points
 */
function checkPoker(cardsHand) {
    var handValue;
    var cardsSum = 0;

    var isTris = 0;
    var isDouble = 0;

    sortsArray(cardsHand);

    // If the cards have the same suit
    if (isFlush(cardsHand)) {

        if (checkConsecutiveCards(cardsHand)) {
            // Ten to Ace of the same suit
            if (cardsHand[0].card === 10) {
                handValue = 10;
            } else {
                // Five consecutive cards of the same suit
                handValue = 9;
            }
        } else {
            // Five cards of the same suit
            handValue = 6;
        }

        cardsSum = getCardsSum(cardsHand);
    } else {
        // count the occurences of the card
        var cardsOccurences = checkOccurences(cardsHand);
        var valOccurences = Object.values(cardsOccurences);

        var sommaPair = 0;

        for (item in cardsOccurences) {
            if (cardsOccurences[item] === 4) {
                handValue = 8;
                cardsSum = item * 4;
                break;
            }

            if (cardsOccurences[item] === 3) {
                isTris = 1;
                cardsSum = item * 3;
                // Three cards of the same rank
                handValue = 4;
            } else if (isTris === 1 && cardsOccurences[item] === 2) {
                // Three of a Kind combined with a Pair
                handValue = 7;
                // It will be possible to add the sum of the pair to do the comparison between the hands with the same tris
            } else if (isTris === 0 && cardsOccurences[item] === 2) {
                isDouble += 1;

                if (isDouble === 1) {
                    // Two cards of the same rank
                    handValue = 2;
                    cardsSum = item * 2;
                } else {
                    // Two separate pairs
                    handValue = 3;
                    sommaPair = item * 2;
                    if (sommaPair > cardsSum) {
                        cardsSum = sommaPair;
                    }
                }
            }
        }

        if (checkConsecutiveCards(cardsHand)) {
            // Five consecutive cards
            handValue = 5;
            cardsSum = getCardsSum(cardsHand);
        }

        // No other hand applies, there aren't occurences
        if (valOccurences.every(val => val === 1)) {
            max = getHighCard(cardsHand);
            handValue = 1;
            cardsSum = max.card;
        }
    }

    var player = {};
    player.handValue = handValue;
    player.points = cardsSum;

    return player;
}

/**
 * Display the cards on the page
 * @param {Array} cardsHand - The cards of the player
 * @returns The HTML images of the cards
 */
function displayCards(cardsHand) {

    var hand = [];
    var yourHand = "";
    var extension = ".png";

    for (i = 0; i < cardsHand.length; i++) {

        hand[i] = cardsHand[i].cardValue + cardsHand[i].suit + extension;
        yourHand += '<img src="./img/' + hand[i] + '" width="100" height="150"/>';

    }

    return yourHand;
}

/**
 * Play the game
 */
function playGame() {
    var players = [];
    var msgEnd = "";

    document.getElementById("playerNum").disabled = true;
    var playerNum = document.getElementById("playerNum").value;

    // If there aren't more cards to play the game is over
    if (countRemainingCards > (52 % (playerNum * 5))) {
        // Creates the game
        players = createGame(playerNum);
        // Creates the winners message
        createWinnersMsg(players, playerNum);

    } else {
        msgEnd = "The game is ended";
        document.getElementById("playBtn").disabled = true;
        document.getElementById("restartBtn").style.display = "inline";
    }

    document.getElementById("remainingCards").innerHTML = "Remaining " + countRemainingCards + " cards <b>" + msgEnd + "</b>";
}

/**
 * Create the hand and check the hand
 * @param {Number} playerNum - The number of the player of the game
 * @returns array of players
 */
function createGame(playerNum) {
    var result = [];
    var cardsPlayers = [];
    var yourHand;
    var msg = "";

    for (var i = 0; i < playerNum; i++) {
        // Creates the cards of the players
        cardsPlayers[i] = createHand();

        // Checks what is the hand of the players
        result.push(checkPoker(cardsPlayers[i]));
        // Adds the number of the player
        result[i].playerNum = i + 1;

        // If the hand is a high card get the value of the max
        if (result[i].handValue === 1) {
            msg = score[result[i].handValue] + " " + max.cardValue;
        } else {
            msg = score[result[i].handValue];
        }

        // Shows the cards
        yourHand = displayCards(cardsPlayers[i]);

        // Sents the cards and the result to the html page 
        var id = "cardsPlayer" + [i + 1];
        var columnId = "column" + [i + 1];
        document.getElementById(columnId).style.display = "block";
        document.getElementById(id).innerHTML = yourHand;

        var resultId = "result" + [i + 1];
        document.getElementById(resultId).innerHTML = msg;

    }

    return result;
}
/**
 * Creates the winners message
 * @param {Array} players - Array of objects
 * @param {Number} playerNum - The number of players
 */
function createWinnersMsg(players, playerNum) {
    var winners = [];
    if (playerNum > 1) {
        winners = checkWinners(players);
    }
    if (winners.length !== 0) {
        var msgWin = "You Win: ";

        if (winners.length == 1) {
            msgWin += "Player " + winners[0];
        } else {
            winners.forEach(item => msgWin += " Player " + item);
        }

        document.getElementById("winner").style.display = "block";
        document.getElementById("winner").innerHTML = msgWin;
    }
}

/**
 * Checks who is the winner of the game
 * @param {Array} array - list of objects with handValue and points of each player
 * @returns array of the winners
 */
function checkWinners(array) {

    array.sort((a, b) => {
        if (a.handValue === b.handValue) {
            return b.points - a.points;
        }
        return b.handValue > a.handValue ? 1 : -1;
    });

    var winners = [array[0].playerNum];

    array.reduce(function(acc, curr) {
        if (acc.handValue === curr.handValue) {
            if (acc.points === curr.points) {
                return winners.push(curr.playerNum);
            }
        }
        return winners;
    });

    return winners;
}

/**
 * Restart the game
 */
function restart() {
    window.location.reload();
}