const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const startingNumbers = inputs[0].split(',').map(e => +e);
const map = {};

startingNumbers.forEach((n, i) =>
    map[n] = [i + 1, 0]
);

let turn = startingNumbers.length + 1;
let last = startingNumbers[startingNumbers.length - 1];

// very slow solution
while(turn <= 30000000) {
    // first time spoken
    if(map[last][1] === 0) {
        last = 0;
        if(map[0] === undefined) {
            map[0] = [turn, 0];
        }
        else {
            map[0][1] = 1;
        }
    }
    // already spoken before
    else {
        // get the number of turns from previous
        const tmp = last;
        last = turn - 1 - map[last][0];

        // save previous position
        map[tmp][0] = turn - 1;

        if(map[last] === undefined) {
            map[last] = [turn, 0];
        }
        else {
            map[last][1] = 1;
        }
    }

    //console.log(`Turn: ${turn}, Number: ${last}`);
    turn++;
}

console.log(last);