const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let left = [];
let rightCountMap = {};

for(let line of data) {
    const nums = line.split("   ");
    left.push(+nums[0]);
    rightCountMap[nums[1]] = rightCountMap[nums[1]] ? rightCountMap[nums[1]] + 1 : 1;
}

let similarityScore = 0;

for(let i = 0; i < left.length; i++) {
    similarityScore += left[i] * (rightCountMap[left[i]] ?? 0);
}

console.log(similarityScore);