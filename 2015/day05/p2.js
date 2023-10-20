const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let niceStringsCount = 0;

for(const line of input) {
    let hasPairAppearsTwice = false;
    let hasOneLetterRepeatWithBetween = false;

    for(let i = 0; i < line.length - 2; i++) {
        const pair = line[i] + line[i + 1];
        if(line.substring(i + 2).includes(pair)) {
            hasPairAppearsTwice = true;
        }
        if(line[i] === line[i + 2]) {
            hasOneLetterRepeatWithBetween = true;
        }
    }

    if(hasPairAppearsTwice && hasOneLetterRepeatWithBetween) {
        niceStringsCount++;
    }
}

console.log(niceStringsCount);