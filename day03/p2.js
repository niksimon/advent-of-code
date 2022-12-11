const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

const inputs = data.split("\r\n");

let sum = 0;

for(let i = 0; i < inputs.length; i += 3) {
    for(const c of inputs[i]) {
        if(inputs[i + 1].includes(c) && inputs[i + 2].includes(c)) {
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
