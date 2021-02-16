var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var suits = ["C", "D", "H", "S"];
var msg = "";

var suitsHand = [];
var cardsHand = [];

/**
 * Crea la mano del giocatore
 */
function createHand() {

    for (i = 0; i < 5; i++) {
        suitsHand[i] = suits[Math.floor(Math.random() * suits.length)];
        cardsHand[i] = cards[Math.floor(Math.random() * cards.length)];
    }

    // TODO check per controllare che in una mano non posso avere 14  e 1 insieme
}

/**
 * Controlla quale mano ha il giocatore
 */
function checkPoker() {

    var isTris = 0;
    var isDouble = 0;
    var isOrdered = false;
    msg = "";

    //cardsHand = [2, 7, 2, 7, 11];
    // ordina l'array delle carte
    cardsHand.sort(
        function(a, b) {
            return a - b;
        }
    );

    //console.log(cardsHand);

    // controlla l'array dei semi per vedere se tutte le carte hanno lo stesso seme
    suitsHand.sort();
    //suitsHand = ["C", "C", "C", "C"];
    var isDiff = false;
    for (i = 0; i < suitsHand.length; i++) {
        if (suitsHand[i] != suitsHand[0]) {
            isDiff = true;
            break;
        }
    }

    console.log(isDiff);

    // Se le carte hanno tutte lo stesso seme
    if (!isDiff) {
        // Sono ordinati dal 10 all'asso?
        //cardsHand = [10, 11, 12, 13, 14];
        if (cardsHand[0] == 10) {
            msg = "Royal Flush";
        } else {
            // Sono ordinati in maniera crescente?
            //cardsHand = [1, 2, 3, 4, 5];
            console.log(cardsHand);

            isOrdered = orders(cardsHand);

            if (isOrdered) {
                msg = "Straight Flush"
            }
        }

        // altrimenti msg = "Flush"
        if (msg == "") {
            msg = "Flush";
        }

        console.log(msg);

    } else {
        /*var counts = {};

        for (var i = 0; i < cardsHand.length; i++) {
            var num = cardsHand[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        //console.log(counts);
        */

        var result = occurances(cardsHand);
        console.log(result);

        for (i = 0; i < result.length; i++) {
            // 4 carte dello stesso valore
            if (result[i] == 4) {
                msg = "Four of a King";
                break;
            }

            // 3 carte dello stesso valore
            if (result[i] == 3) {
                isTris = 1;
                msg = "Three of a Kind";
            }

            // Per 1 e 2 coppie
            if (result[i] == 2) {
                isDouble += 1;
            }
        }

        // 5 carte consecutive
        console.log("cards " + cardsHand);

        isOrdered = orders(cardsHand);
        console.log(isOrdered);

        console.log(isDouble + " " + isTris);

        if (isTris == 1 && isDouble == 1) {
            // 3 + 2
            msg = "FullHouse";
        } else if (isOrdered) {
            // 5 carte consecutive
            msg = "Straight";
        } else if (isTris == 1 && isDouble == 0) {
            // 3
            msg = "Three of a Kind"
        } else if (isDouble == 2) {
            // 2 Coppie
            msg = "Two Pair"
        } else if (isDouble == 1) {
            // 1 Coppia
            msg = "Pair";
        }

        // non meccia, restituisce la carta più alta 
        if (msg == "") {
            msg = "La carta più alta è: " + cardsHand[cardsHand.length - 1];
        }

    }
    console.log("msg " + msg);
}


/**
 * Checks if the array is ordered
 * @param {Array} arr 
 */
function orders(arr) {
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
function occurances(arr) {

    var a = [],
        b = [],
        prev;

    arr.sort(function(a, b) { return a - b; });
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = arr[i];
    }

    return b;

}

function displayHand() {
    console.log(suitsHand);
    console.log(cardsHand);
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
        } else if (cardsHand[i] == 14) {
            hand[i] = "A" + suitsHand[i] + ".png";
        } else {
            hand[i] = cardsHand[i] + suitsHand[i] + ".png";
        }
    }
    console.log(hand);

    var yourHand = "<p> </p>";

    for (i = 0; i < hand.length; i++) {
        yourHand += '<img src="./img/' + hand[i] + '" width="200" height="350"/>';
    }
    yourHand += "<br/>";
    document.getElementById("displayHand").innerHTML = yourHand;
}

function myHand() {
    createHand();
    displayHand();
}

function playGame() {
    //createHand();
    console.log(suitsHand);
    console.log(cardsHand);
    checkPoker();
    document.getElementById("result").innerHTML = msg;
    console.log(cardsHand);
}