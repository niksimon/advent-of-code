const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

const inputs = data.split("\r\n");

let max = 0, current = 0;

for(const line of inputs) {
    if(line === "") {
        max = current > max ? current : max;
        current = 0;
    }
    else {
        current += +line;
    }
}

console.log(max);