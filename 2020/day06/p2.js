const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let questions = {};
let people = 0;
let sum = 0;

for(const line of inputs) {
    if(line === '') {
        for(const q in questions) {
            if(questions[q] === people) {
                sum++;
            }
        }
        questions = {};
        people = 0;
        continue;
    }
    else {
        for(const q of line) {
            questions[q] = questions[q] ? questions[q] + 1 : 1;
        }
        people++;
    }
}

console.log(sum);