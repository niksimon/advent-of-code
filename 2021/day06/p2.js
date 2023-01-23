const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const fish = inputs[0].split(",").map(e => +e);
let ages = new Array(9).fill(0);

for(const f of fish) {
    ages[f]++;
}

for(let days = 256; days > 0; days--) {
    const ageZero = ages.shift();
    ages.push(ageZero);
    ages[6] += ageZero;
}

let count = 0;
for(const age of ages) {
    count += age;
}

console.log(count);