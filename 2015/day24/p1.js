const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const sum = input.reduce((a, c) => a + +c, 0);
const nums = input.map(e => +e).sort((a, b) => b - a);
const sumThird = sum / 3;

const stack = nums.map(e => [+e]);

const arrays = [];
let minArrayLength = 9999999;

while(stack.length > 0) {
    const item = stack.pop();
    const numsSum = item.reduce((a, c) => a + c, 0);

    if(numsSum === sumThird) {
        minArrayLength = Math.min(minArrayLength, item.length);
        arrays.push(item);
        continue;
    }

    if(item.length + 1 > minArrayLength) {
        continue;
    }
    
    const toAdd = nums.filter(e => e < item[item.length - 1]);

    for(const n of toAdd) {
        if(numsSum + n <= sumThird) {
            const numsCopy = item.slice();
            numsCopy.push(n);
            stack.push(numsCopy);
        }
    }
}

arrays.sort((a, b) => a.length - b.length);

const smallestLength = arrays[0].length;
const smallestArrays = arrays.filter(a => a.length === smallestLength);

console.log(Math.min(...smallestArrays.map(e => e.reduce((a, c) => a * c, 1))));