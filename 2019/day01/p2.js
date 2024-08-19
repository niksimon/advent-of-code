const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;

for(const line of data) {
    let fuel = Math.floor(line / 3) - 2;
    while(fuel > 0) {
        sum += fuel;
        fuel = Math.floor(fuel / 3) - 2;
    }
}

console.log(sum);