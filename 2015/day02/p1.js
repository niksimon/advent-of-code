const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let area = 0;

for(const line of input) {
    const [l, w, h] = line.split('x');
    const sides = [l * w, l * h, w * h];
    area += 2 * (sides[0] + sides[1] + sides[2]) + Math.min(...sides);
}

console.log(area);