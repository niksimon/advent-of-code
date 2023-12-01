const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;

for(const line of data) {
    const nums = line.split('').filter(e => Number.isInteger(+e));  
    sum += +`${nums[0]}${nums[nums.length - 1]}`;
}

console.log(sum);