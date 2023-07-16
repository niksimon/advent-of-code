const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let valid = 0;

for(const line of inputs) {
    const split = line.split(' ');

    const [first, second] = split[0].split('-');
    const letter = split[1][0];
    const password = split[2];

    if((password[first - 1] === letter) !== (password[second - 1] === letter)) {
        valid++;
    }
}

console.log(valid);