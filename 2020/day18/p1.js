const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let sum = 0;

for(let exp of inputs) {
    while(exp.indexOf('(') > -1) {
        let start = 0;
        let end = 0;
        for(let i = 0; i < exp.length; i++) {
            if(exp[i] === '(') {
                start = i;
            }
            else if(exp[i] === ')') {
                end = i;
                const e = exp.substring(start, end + 1);
                const res = calc(e.substring(1, e.length - 1));
                exp = exp.replace(e, res);
                break;
            }
        }
    }
    sum += calc(exp);
}

console.log(sum);

function calc(e) {
    let items = e.split(' ');
    let res = +items[0];
    let i = 1;
    while(i < items.length) {
        if(items[i] === '+') {
            res += +items[i + 1];
        }
        else if(items[i] === '*') {
            res *= +items[i + 1];
        }
        i += 2;
    }
    return res;
}