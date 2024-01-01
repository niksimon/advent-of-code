const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let sum = 0;

for(let line of input) {
    let len = 0;
    for(let i = 0; i < line.length; i++) {
        len += (line[i] === '\\' || line[i] === '"') ? 2 : 1;
    }
    sum += len + 2 - line.length;
}

console.log(sum);