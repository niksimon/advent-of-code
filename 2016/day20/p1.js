const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const ranges = [];

for(const line of input) {
    const [from, to] = line.split('-').map(e => +e);
    ranges.push([from, to]);
}

ranges.sort((a, b) => a[0] - b[0]);

for(let i = 1; i < ranges.length; i++) {
    if(ranges[i][0] > ranges[i - 1][1] + 1) {
        console.log(ranges[i - 1][1] + 1);
        break;
    }
}
