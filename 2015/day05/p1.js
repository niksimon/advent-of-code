const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const vowels = ['a','e','i','o','u'];
const blacklist = ['ab', 'cd', 'pq', 'xy'];
let niceStringsCount = 0;

for(const line of input) {
    let vowelsCount = 0;
    let oneLetterTwiceInARow = false;
    let hasBlacklistedWord = false;

    for(let i = 0; i < line.length; i++) {
        if(vowels.includes(line[i])) {
            vowelsCount++;
        }
        if(i < line.length - 1) {
            const pair = line[i] + line[i + 1];
            if(blacklist.includes(pair)) {
                hasBlacklistedWord = true;
                break;
            }
            if(line[i] === line[i + 1]) {
                oneLetterTwiceInARow = true;
            }
        }
    }

    if(!hasBlacklistedWord && oneLetterTwiceInARow && vowelsCount >= 3) {
        niceStringsCount++;
    }
}

console.log(niceStringsCount);