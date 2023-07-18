const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let questions = new Set();
let sum = 0;

for(const line of inputs) {
    for(const q of line) {
        questions.add(q);
    }
    if(line === '') {
        sum += questions.size;
        questions = new Set();
        continue;
    }
}

console.log(sum);