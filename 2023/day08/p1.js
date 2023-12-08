const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const nodes = {};

for(let i = 2; i < data.length; i++) {
    const lineSplit = data[i].split("=").map(e => e.trim());
    const nodeName = lineSplit[0];
    const [left, right] = lineSplit[1].substring(1, lineSplit[1].length - 1).split(',').map(e => e.trim());
    nodes[nodeName] = {left, right};
}

const moves = data[0];
let currentMove = 0;
let currentNode = 'AAA';
let steps = 0;

while(currentNode !== 'ZZZ') {
    currentNode = moves[currentMove] === 'R' ? nodes[currentNode].right : nodes[currentNode].left;
    currentMove = currentMove + 1 === moves.length ? 0 : currentMove + 1;
    steps++;
}

console.log(steps);