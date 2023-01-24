const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const crabs = inputs[0].split(',').map(e => +e).sort((a, b) => a - b);
const mid = crabs[Math.floor(crabs.length / 2)];
let fuel = 0;

for(const crab of crabs) {
    fuel += Math.abs(crab - mid);
}

console.log(fuel);