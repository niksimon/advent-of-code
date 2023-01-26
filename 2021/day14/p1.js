const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let template = inputs[0];
const rules = {};

for(let i = 2; i < inputs.length; i++) {
    const [pair, element] = inputs[i].split(' -> ');
    rules[pair] = element;
}

let steps = 10;
const charCounts = {};

for(const ch of template) {
    charCounts[ch] = charCounts[ch] + 1 || 1;
}

while(steps > 0) {
    let newTemplate = template[0];
    for(let i = 0; i < template.length - 1; i++) {
        const pair = template[i] + template[i + 1];
        if(rules[pair]) {
            const el = rules[pair];
            newTemplate += el + template[i + 1];
            charCounts[el] = charCounts[el] + 1 || 1;
        }
    }
    template = newTemplate;
    //console.log(template);
    steps--;
}

console.log(Math.max(...Object.values(charCounts)) - Math.min(...Object.values(charCounts)));