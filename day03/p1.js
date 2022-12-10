const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

let inputs = data.split("\r\n");

let sum = 0;

for(let i of inputs) {
    let firstHalf = i.substring(0, i.length / 2);
    let secondHalf = i.substring(i.length / 2);

    for(let c of firstHalf) {
        if(secondHalf.includes(c)) {
            if(c === c.toLowerCase()) {
                sum += c.charCodeAt() - 96;
            }
            else {
                sum += c.charCodeAt() - 38;
            }
            break;
        }
    }
}

console.log(sum);
