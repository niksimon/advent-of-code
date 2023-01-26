const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let template = inputs[0];
const rules = {};

for(let i = 2; i < inputs.length; i++) {
    const [pair, element] = inputs[i].split(' -> ');
    rules[pair] = element;
}

let pairCounts = {};
let steps = 40;

for(let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    pairCounts[pair] = pairCounts[pair] + 1 || 1;
}

while(true) {
    const newPairCounts = {};
    for(const [pair, count] of Object.entries(pairCounts)) {
        newPairCounts[`${pair[0]}${rules[pair]}`] = newPairCounts[`${pair[0]}${rules[pair]}`] + count || count;
        newPairCounts[`${rules[pair]}${pair[1]}`] = newPairCounts[`${rules[pair]}${pair[1]}`] + count || count;
    }
    steps--;
    if(steps === 0) {
        break;
    }
    pairCounts = newPairCounts;
}

const charCounts = {};
charCounts[template[template.length - 1]] = 1;

for(const [pair, count] of Object.entries(pairCounts)) {
    charCounts[pair[0]] = charCounts[pair[0]] + count || count;
    charCounts[rules[pair]] = charCounts[rules[pair]] + count || count;
}

console.log(charCounts);

console.log(Math.max(...Object.values(charCounts)) - Math.min(...Object.values(charCounts)));