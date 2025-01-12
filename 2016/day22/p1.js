const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const nodes = [];

for(let i = 2; i < input.length; i++) {
    // Filesystem  Size  Used  Avail  Use%
    const params = input[i].replace(/\s+/g, ' ').split(' ');

    const pos = params[0].substring(params[0].indexOf('-') + 1).split('-').map(e => +e.substring(1));
    const size = parseInt(params[1]);
    const used = parseInt(params[2]);
    const available = parseInt(params[3]);
    const usedPercent = parseInt(params[4]);

    nodes.push({pos, size, used, available, usedPercent});
}

let viablePairs = 0;

function isViablePair(n1, n2) {
    return n1.used > 0 && n1.used <= n2.available ? 1 : 0;
}

for(let i = 0; i < nodes.length - 1; i++) {
    const node1 = nodes[i];
    for(let j = i + 1; j < nodes.length; j++) {
        const node2 = nodes[j];
        viablePairs += isViablePair(node1, node2) + isViablePair(node2, node1);
    }
}

console.log(viablePairs);