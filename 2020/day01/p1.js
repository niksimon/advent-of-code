const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const map = {};

for(const num of inputs) {
    if(map[2020 - num] !== undefined) {
        console.log(`${2020 - num} * ${num} = ${(2020 - num) * num}`);
        break;
    }
    map[num] = 1;
}