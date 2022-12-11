const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

const inputs = data.split("\r\n");

let result = 0;

for(const line of inputs) {
    let [elf1, elf2] = line.split(",");
    let [elf1start, elf1end] = elf1.split("-").map(x => +x);
    let [elf2start, elf2end] = elf2.split("-").map(x => +x);

    if(elf1start <= elf2end && elf1end >= elf2end || elf2start <= elf1end && elf2end >= elf1end) {
        result++;
    }
}

console.log(result);