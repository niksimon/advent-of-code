const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;

for(const line of data) {
    const fuel = Math.floor(line / 3) - 2;
    sum += fuel;
}

console.log(sum);