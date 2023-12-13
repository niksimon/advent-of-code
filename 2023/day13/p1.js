const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let pattern = [];
let sum = 0;

for(let i = 0; i < data.length; i++) {
    if(data[i] === '') {
        // check vertically
        let column1 = '';
        let column2 = '';
        for(let j = 0; j < pattern[0].length - 1; j++) {
            for(let k = 0; k < pattern.length; k++) {
                column1 += pattern[k][j];
                column2 += pattern[k][j + 1];
            }
            if(column1 === column2 && isVerticalReflection(pattern, j, j + 1)) {
                sum += j + 1;
                console.log(`Found reflection between columns ${j + 1} and ${j + 2}`);
            }
            column1 = '';
            column2 = '';
        }

        // check horizontally
        for(let j = 0; j < pattern.length - 1; j++) {
            if(pattern[j] === pattern[j + 1] && isHorizontalReflection(pattern, j, j + 1)) {
                sum += (j + 1) * 100;
                console.log(`Found reflection between rows ${j + 1} and ${j + 2}`);
            }
        }

        pattern = [];
        continue;
    }

    pattern.push(data[i]);
}

console.log(sum);

function isVerticalReflection(_pattern, left, right) {
    for(let n = left - 1, m = right + 1; n >= 0 && m < _pattern[0].length; n--, m++) {
        let column1 = '';
        let column2 = '';
        for(let k = 0; k < _pattern.length; k++) {
            column1 += _pattern[k][n];
            column2 += _pattern[k][m];
        }
        if(column1 !== column2) {
            return false;
        }
    }
    return true;
}

function isHorizontalReflection(_pattern, top, bottom) {
    for(let n = top - 1, m = bottom + 1; n >= 0 && m < _pattern.length; n--, m++) {
        if(_pattern[n] !==  _pattern[m]) {
            return false;
        }
    }
    return true;
}