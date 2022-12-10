const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

let inputs = data.split("\r\n");

let sum = 0;

for(let i = 0; i < inputs.length; i += 3) {
    let elf1 = inputs[i];
    let elf2 = inputs[i + 1];
    let elf3 = inputs[i + 2];

    for(let c of elf1) {
        if(elf2.includes(c) && elf3.includes(c)) {
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
