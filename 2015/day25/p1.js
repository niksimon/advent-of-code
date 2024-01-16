const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const row = 1, column = 1;

let n = column * (column + 1) / 2;

for(let i = 0; i < row - 1; i++) {
    n += column + i;
}

let a = 20151125;

for(let i = 0; i < n - 1; i++) {
    a = (a * 252533) % 33554393;
}

console.log(a);