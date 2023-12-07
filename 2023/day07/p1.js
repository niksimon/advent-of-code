const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const cardsStrength = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const handTypes = {highCard: 1, onePair: 2, twoPair: 3, threeOfAKind: 4, fullHouse: 5, fourOfAKind: 6, fiveOfAKind: 7};

const hands = data.map(e => {
    const [hand, bid] = e.split(" ");
    return {hand, bid: +bid};
});

function getType(hand) {
    const cardsCount = {};

    for(const c of hand) {
        cardsCount[c] = cardsCount[c] ? cardsCount[c] + 1 : 1;
    }

    const eachCardsCount = Object.values(cardsCount).sort((a, b) => b - a);
    const uniqueCardsCount = eachCardsCount.length;

    // Five of a kind
    if(uniqueCardsCount === 1) {
        return handTypes.fiveOfAKind;
    }
    // Four of a kind
    else if(uniqueCardsCount === 2 && eachCardsCount[0] === 4) {
        return handTypes.fourOfAKind;
    }
    // Full house
    else if(uniqueCardsCount === 2 && eachCardsCount[0] === 3) {
        return handTypes.fullHouse;
    }
    // Three of a kind
    else if(uniqueCardsCount === 3 && eachCardsCount[0] === 3) {
        return handTypes.threeOfAKind;
    }
    // Two pair
    else if(uniqueCardsCount === 3 && eachCardsCount[0] === 2) {
        return handTypes.twoPair;
    }
    // One pair
    else if(uniqueCardsCount === 4 && eachCardsCount[0] === 2) {
        return handTypes.onePair;
    }
    // High card
    else {
        return handTypes.highCard;
    }
}

hands.sort((h1, h2) => {
    const h1Type = getType(h1.hand);
    const h2Type = getType(h2.hand);

    // if same type then compare cards
    if(h1Type === h2Type) {
        for(let i = 0; i < 5; i++) {
            const card1Strength = cardsStrength.indexOf(h1.hand[i]);
            const card2Strength = cardsStrength.indexOf(h2.hand[i]);
            if(card1Strength === card2Strength) {
                continue;
            }
            else {
                return card1Strength - card2Strength;
            }
        }
        return 0;
    }
    else {
        return h1Type - h2Type;
    }
});

let totalWinnings = 0;
for(let i = 0; i < hands.length; i++) {
    totalWinnings += hands[i].bid * (i + 1);
}
console.log(totalWinnings);