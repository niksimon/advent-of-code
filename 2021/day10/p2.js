const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const chunks = {')': '(', ']': '[', '}': '{', '>': '<'};
const points = {'(': 1, '[': 2, '{': 3, '<': 4};
const scores = [];

lines: for(const line of inputs) {
    const open = [];
    for(const ch of line) {
        if("([{<".includes(ch)) {
            open.push(ch);
        }
        else if(chunks[ch] !== open.pop()){
            continue lines;
        }
    }
    let score = 0;
    open.reverse().forEach(e => score = score * 5 + points[e]);
    scores.push(score);
}

scores.sort((a, b) => a - b);
console.log(scores[Math.floor(scores.length / 2)]);