const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

let inputs = data.split("\r\n");

let score = 0;

for(let i of inputs) {
    let [opponent, player] = i.split(" ");

    score += player.charCodeAt() - 87;

    if(opponent.charCodeAt() === player.charCodeAt() - 23) {
        score += 3;
    }
    else if(opponent === "A" && player === "Y" || opponent === "B" && player === "Z" || opponent === "C" && player === "X") {
        score += 6;
    }
}

console.log(score);