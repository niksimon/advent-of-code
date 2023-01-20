const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let count = 0;

for(let i = 1; i < inputs.length - 2; i++) {
    const sum1 = +inputs[i] + +inputs[i + 1] + +inputs[i + 2];
    const sum2 = +inputs[i - 1] + +inputs[i] + +inputs[i + 1];
    if(sum1 > sum2) {
        count++;
    }
}

console.log(count);