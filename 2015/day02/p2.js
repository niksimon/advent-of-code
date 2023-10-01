const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let ribbon = 0;

for(const line of input) {
    const sides = line.split('x').map(s => +s);
    sides.sort((a, b) => a - b);
    
    ribbon += 2 * (sides[0] + sides[1]) + sides[0] * sides[1] * sides[2];
}

console.log(ribbon);