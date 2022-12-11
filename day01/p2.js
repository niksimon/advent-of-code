const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

const inputs = data.split("\r\n");

let b = [0], j = 0;

for(const line of inputs) {
    if(line === "") {
        b[++j] = 0;
        continue;
    }
    b[j] += +line;
}

b.sort((a,b) => b - a);

console.log(b[0] + b[1] + b[2]);