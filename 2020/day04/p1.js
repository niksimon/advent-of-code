const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let validPassports = 0, fields = [];

for(const line of inputs) {
    if(line === '') {
        if(fields.length === 8 || (fields.length === 7 && !fields.includes("cid"))) {
            validPassports++;
        }
        fields = [];
        continue;
    }
    fields.push(...line.split(' ').map(e => e.split(':')[0]));
}

console.log(validPassports);