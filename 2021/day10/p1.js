const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const chunks = {')': '(', ']': '[', '}': '{', '>': '<'};
const points = {')': 3, ']': 57, '}': 1197, '>': 25137};
let score = 0;

for(const line of inputs) {
    const open = [];
    for(const ch of line) {
        if("([{<".includes(ch)) {
            open.push(ch);
        }
        else if(chunks[ch] !== open.pop()){
            score += points[ch];
            break;
        }
    }
}

console.log(score);