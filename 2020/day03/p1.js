const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const width = inputs[0].length;
const height = inputs.length;
let trees = 0;
let x = 3, y = 1;

while(y < height) {
    if(inputs[y][x % width] === '#') {
        trees++;
    }

    x += 3;
    y++;
}

console.log(trees);