const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

const inputs = data.split("\r\n").map(e => e.split(" "));

const loseInput = {A: 3, B: 1, C: 2};
const winInput = {A: 2, B: 3, C: 1};

let score = 0;

for(const [opponent, player] of inputs) {
    switch(player) {
        case "X":
            score += loseInput[opponent];
            break;
        case "Y":
            score += opponent.charCodeAt() - 64 + 3;
            break;
        case "Z":
            score += winInput[opponent] + 6;
            break;
    }
}

console.log(score);