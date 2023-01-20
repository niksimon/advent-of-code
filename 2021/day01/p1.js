const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let count = 0;

for(let i = 1; i < inputs.length; i++) {
    if(+inputs[i] > +inputs[i - 1]) {
        count++;
    }
}

console.log(count);