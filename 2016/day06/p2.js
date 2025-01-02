const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const columns = {};

for(let i = 0; i < input[0].length; i++) {
    columns[i] = {};
}

for(const line of input) {
    for(let i = 0; i < line.length; i++) {
        columns[i][line[i]] = (columns[i][line[i]] || 0) + 1;
    }
}

let msg = '';
for(const c in columns) {
    const counts = Object.entries(columns[c]).sort((a, b) => a[1] - b[1]);
    msg += counts[0][0];
}

console.log(msg);