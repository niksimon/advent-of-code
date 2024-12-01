const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let left = [];
let right = [];

for(let line of data) {
    const nums = line.split("   ");
    left.push(+nums[0]);
    right.push(+nums[1]);
}

left.sort();
right.sort();

let sum = 0;

for(let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
}

console.log(sum);