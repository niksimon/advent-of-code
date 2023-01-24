const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const crabs = inputs[0].split(',');

const [min, max] = [Math.min(...crabs), Math.max(...crabs)];

const fuel = new Array(max + 1).fill(0);

for(let pos = min; pos <= max; pos++) {
    for(const crab of crabs) {
        const steps = Math.abs(crab - pos);
        fuel[pos] += steps * (steps - 1) / 2 + steps;
    }
}

console.log(Math.min(...fuel));