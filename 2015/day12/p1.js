const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const json = input[0];
let num = '';
let sum = 0;
let sign = '+';

for(let i = 0; i < json.length; i++) {
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