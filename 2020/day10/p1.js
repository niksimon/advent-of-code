const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n").map(e => +e);

inputs.sort((a, b) => a - b);
inputs.unshift(0);
inputs.push(inputs[inputs.length - 1] + 3);

let diff1 = 0;
let diff3 = 0;

for(let i = 0; i < inputs.length - 1; i++) {
    if(inputs[i + 1] - inputs[i] === 1) {
        diff1++;
    }
    else {
        diff3++;
    }
}

console.log(diff1 * diff3);