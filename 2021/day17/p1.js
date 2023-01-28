const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const target = inputs[0].split(": ")[1].split(", ").map(e => e.split("=")[1].split("..").map(e => +e));

console.log(target[1][0] * (target[1][0] + 1) / 2);