const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(d => d.split('\r\n'));

const locks = [];
const keys = [];

data.forEach(d => {
    if(d[0] === '#####') {
        locks.push(new Array(5).fill(0));
    }
    else {
        keys.push(new Array(5).fill(0));
    }
    
    for(let i = 0; i < 7; i++) {
        for(let j = 0; j < 5; j++) {
            if(d[0] === '#####' && d[i][j] === '.') {
                locks[locks.length - 1][j]++;
            }
            else if(d[0] === '.....' && d[i][j] === '#') {
                keys[keys.length - 1][j]++;
            }
        }
    }
});

let uniquePairs = 0;

keys.forEach(k => {
    locks.forEach(l => {
        if(l.every((n, i) => n >= k[i])) {
            uniquePairs++;
        }
    });
});

console.log(uniquePairs);