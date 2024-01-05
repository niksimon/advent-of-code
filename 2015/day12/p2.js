const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const json = input[0];

let level = 0;
let redLevel = 0;
let isRed = false;
let levelsIdx = {};
let redObjectRanges = [];

// Find all objects with value "red"
for(let i = 0; i < json.length; i++) {
    if(json[i] === '{') {
        level++;
        levelsIdx[level] = i;
    }
    else if(json[i] === '}') {
        level--;
        if(isRed && redLevel > level) {
            console.log(`Red value from ${levelsIdx[level + 1]} to ${i}`);
            redObjectRanges.push([levelsIdx[level + 1], i]);
            isRed = false;
        }
    }

    if(!isRed && json.substring(i, i + 6) === ':"red"') {
        isRed = true;
        redLevel = level;
    }
}

let num = '';
let sum = 0;
let sign = '+';

for(let i = 0; i < json.length; i++) {
    if(redObjectRanges.some(e => e[0] <= i && e[1] >= i)) {
        continue;
    }

    if(json[i] === '-') {
        sign = '-';
    }
    else if(Number.isInteger(+json[i])) {
        num += json[i];
    }
    else if(!Number.isInteger(+json[i]) && num !== '') {
        sum += +`${sign}${num}`;
        num = '';
        sign = '+';
    }
}

console.log(sum);