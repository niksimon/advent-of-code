const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let pattern = [];
let sum = 0;

for(let i = 0; i < data.length; i++) {
    if(data[i] === '') {
        // check vertically
        for(let j = 0; j < pattern[0].length - 1; j++) {
            if(verticalSmudge(pattern, j, j + 1)) {
                sum += j + 1;
                console.log(`Reflection between columns ${j + 1} and ${j + 2}`);
            }
        }

        // check horizontally
        for(let j = 0; j < pattern.length - 1; j++) {
            if(horizontalSmudge(pattern, j, j + 1)) {
                sum += (j + 1) * 100;
                console.log(`Reflection between rows ${j + 1} and ${j + 2}`);
            }
        }

        pattern = [];
        continue;
    }

    pattern.push(data[i]);
}

console.log(sum);

function verticalSmudge(_pattern, left, right) {
    let foundSmudge = false;

    for(let n = left, m = right; n >= 0 && m < _pattern[0].length; n--, m++) {
        let countDifferent = 0;

        for(let k = 0; k < _pattern.length; k++) {
            if(_pattern[k][n] !== _pattern[k][m]) {
                countDifferent++;
                if(countDifferent > 1 || countDifferent === 1 && foundSmudge) {
                    return false;
                }
            }
        }

        if(countDifferent === 1) {
            foundSmudge = true;
        }
    }

    return foundSmudge;
}

function horizontalSmudge(_pattern, top, bottom) {
    let foundSmudge = false;

    for(let n = top, m = bottom; n >= 0 && m < _pattern.length; n--, m++) {
        let countDifferent = 0;

        for(let k = 0; k < _pattern[0].length; k++) {
            if(_pattern[n][k] !== _pattern[m][k]) {
                countDifferent++;
                if(countDifferent > 1 || countDifferent === 1 && foundSmudge) {
                    return false;
                }
            }
        }

        if(countDifferent === 1) {
            foundSmudge = true;
        }
    }
    
    return foundSmudge;
}