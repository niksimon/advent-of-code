const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

function supportsABBA(str) {
    for(let i = 0; i < str.length - 3; i++) {
        if(str[i] === str[i + 3] && str[i + 1] === str[i + 2] && str[i] !== str[i + 1]) {
            return true;
        }
    }

    return false;
}

let n = 0;

for(const line of input) {
    let hypernetSequences = [];
    let outsideSequences = [];
    let insideHypernet = false;
    let hypernet = '';
    let outside = '';

    for(let i = 0; i <= line.length; i++) {
        if(i === line.length || line[i] === '[') {
            insideHypernet = true;
            outsideSequences.push(outside);
            outside = '';
        }
        else if(line[i] === ']') {
            insideHypernet = false;
            hypernetSequences.push(hypernet);
            hypernet = '';
        }
        else if(insideHypernet) {
            hypernet += line[i];
        }
        else {
            outside += line[i];
        }
    }

    if(outsideSequences.some(s => supportsABBA(s)) && !hypernetSequences.some(s => supportsABBA(s))) {
        n++;
    }
}

console.log(n);