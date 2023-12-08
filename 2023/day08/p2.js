const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const nodes = {};
const currentNodes = [];

for(let i = 2; i < data.length; i++) {
    const lineSplit = data[i].split("=").map(e => e.trim());
    const nodeName = lineSplit[0];

    if(nodeName[2] === 'A') {
        currentNodes.push({node: nodeName, endStep: 0, ended: false});
    }

    const [left, right] = lineSplit[1].substring(1, lineSplit[1].length - 1).split(',').map(e => e.trim());
    nodes[nodeName] = {left, right};
}

const moves = data[0];
let currentMove = 0;
let steps = 0;

while(!currentNodes.every(e => e.ended)) {
    for(let i = 0; i < currentNodes.length; i++) {
        if(currentNodes[i].ended) {
            continue;
        }

        currentNodes[i].node = moves[currentMove] === 'R' ? nodes[currentNodes[i].node].right : nodes[currentNodes[i].node].left;

        if(currentNodes[i].node.endsWith('Z')) {
            currentNodes[i].ended = true;
            currentNodes[i].endStep = steps + 1;
        }
    }

    currentMove = currentMove + 1 === moves.length ? 0 : currentMove + 1;
    steps++;
}

// Find LCM of all end steps
const endSteps = currentNodes.map(e => e.endStep);
console.log(lcm(endSteps));

// Greatest common divisor
function gcd(a, b) {
    if(a < b) {
        const tmp = b;
        b = a;
        a = tmp;
    }
    const t = a % b;
    return t ? gcd(b, t) : b;
}

// Least common multiple
function lcm(arr) {
    let n = 1;
    for(let i = 0; i < arr.length; i++) {
        n = arr[i] / gcd(arr[i], n) * n;
    }
    return n;
}