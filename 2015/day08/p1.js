const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let sum = 0;

for(let line of input) {
    let len = 0;
    let i = 1;
    while(i < line.length - 1) {
        len++;
        if(line[i] === '\\') {
            if(line[i + 1] === '\\' || line[i + 1] === '"') {
                i++;
            }
            else if(line[i + 1] === 'x') {
                i += 3;
            }
        }
        i++;
    }
    sum += line.length - len;
}

console.log(sum);