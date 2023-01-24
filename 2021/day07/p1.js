const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const crabs = inputs[0].split(',');

const [min, max] = [Math.min(...crabs), Math.max(...crabs)];

const fuel = new Array(max + 1).fill(0);

for(let pos = min; pos <= max; pos++) {
    for(const crab of crabs) {
        fuel[pos] += Math.abs(crab - pos);
    }
}

console.log(Math.min(...fuel));