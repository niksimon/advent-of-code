const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

function compare(a, b) {
    let i = 0;
    while(i < Math.min(a.length, b.length)) {
        if(Number.isInteger(a[i]) && Number.isInteger(b[i])) {
            if(a[i] === b[i]) {
                i++;
            }
            else {
                return a[i] - b[i];
            }
        }
        else {
            let an = Number.isInteger(a[i]) ? [a[i]] : a[i].slice();
            let bn = Number.isInteger(b[i]) ? [b[i]] : b[i].slice();
            const cmpNext = compare(an, bn);
            if(cmpNext === 0) {
                i++;
            }
            else {
                return cmpNext;
            }
        }
    }
    return a.length - b.length;
}

let sum = 0;

for(let i = 0; i < inputs.length; i += 3) {
    if(compare(eval(inputs[i]), eval(inputs[i + 1])) < 0) {
        sum += i / 3 + 1;
    }
}

console.log(sum);