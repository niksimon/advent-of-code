const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = data[0].split(',').reduce((a, c) => a + theHashAlgo(c), 0);

console.log(sum);

function theHashAlgo(str) {
    let val = 0;
    for(let i = 0; i < str.length; i++) {
        const ascii = +str.charCodeAt(i);
        val += ascii;
        val *= 17;
        val %= 256;
    }
    return val;
}