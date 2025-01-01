const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let possible = 0;

for(const line of input) {
    const sides = line.replace(/\s+/g, ' ').trim().split(' ').map(e => +e);

    if(sides[0] + sides[1] > sides[2] && sides[0] + sides[2] > sides[1] && sides[1] + sides[2] > sides[0]) {
        possible++;
    }
}

console.log(possible);