const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

let inputs = data.split("\r\n");

let score = 0;
let drawInput = {A: 1, B: 2, C: 3};
let loseInput = {A: 3, B: 1, C: 2};
let winInput = {A: 2, B: 3, C: 1};

for(let i of inputs) {
    let [opponent, choise] = i.split(" ");
    switch(choise) {
        case "X":
            score += loseInput[opponent];
            break;
        case "Y":
            score += drawInput[opponent] + 3;
            break;
        case "Z":
            score += winInput[opponent] + 6;
            break;
    }
}

console.log(score);