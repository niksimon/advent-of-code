const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let cards = {};
let total = 0;

for(let i = data.length - 1; i >= 0; i--) {
    const id = i + 1;
    const line = data[i];
    const lineSplit = line.split(":");
    const [winningNums, myNums] = lineSplit[1].split("|").map(e => e.trim().replaceAll('  ', ' ').split(" "));
    
    const inBoth = myNums.filter(e => winningNums.includes(e));

    cards[id] = inBoth.length;
 
    let current = cards[id];
    for(let k = id + 1; k <= id + cards[id]; k++) {
        current += cards[k];
    }
    total += 1 + current;
    cards[id] = current;
}

console.log(total);