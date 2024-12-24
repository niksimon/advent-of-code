const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(d => d.split('\r\n'));

const gates = {};

data[0].forEach(d => {
    const [gate, value] = d.split(': ');
    gates[gate] = +value;
});

let completed = [];

while(completed.length < data[1].length) {
    for(let i = 0; i < data[1].length; i++) {
        const [g1, op, g2, _, g] = data[1][i].split(' ');

        if(completed.includes(i) || gates[g1] === undefined || gates[g2] === undefined) {
            continue;
        }

        if(op === 'AND') {
            gates[g] = gates[g1] & gates[g2];
        }
        else if(op === 'OR') {
            gates[g] = gates[g1] | gates[g2];
        }
        else if(op === 'XOR') {
            gates[g] = gates[g1] ^ gates[g2];
        }

        completed.push(i);
    }
}

const gatesZ = Object.keys(gates).filter(g => g.startsWith('z')).sort().reverse().map(g => gates[g]).join('');

console.log(parseInt(gatesZ, 2));