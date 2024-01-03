const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let line = input[0];
let result = '';

for(let i = 0; i < 40; i++) {
    let current = line[0];
    let count = 1;
    result = '';
    
    for(let j = 1; j < line.length; j++) {
        if(line[j] !== current) {
            result += `${count}${current}`;
            count = 0;
        }
        current = line[j];
        count++;
    }
    
    result += `${count}${current}`;
    line = result;
    
}

console.log(result.length);