const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const ranges = [];

for(const line of input) {
    const [from, to] = line.split('-').map(e => +e);
    ranges.push([from, to]);
}

ranges.sort((a, b) => a[0] - b[0]);

let allowed = 0;
let maxRight = 0;

for(let i = 0; i < ranges.length; i++) {
    if(ranges[i][0] > maxRight) {
        allowed += Math.max(0, ranges[i][0] - maxRight - 1);
    }

    maxRight = Math.max(maxRight, ranges[i][1]);
}

console.log(allowed);