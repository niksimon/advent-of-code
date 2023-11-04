const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

// CHANGE b signal from 44430 to 3176 in input.txt and run same code as p1

const wires = {};
let lineIdx = 0;
let foundResult = false;

while(!foundResult) {
    const line = input[lineIdx];
    const splitLine = line.split(' -> ');
    const source = splitLine[0];
    const destination = splitLine[1];

    if(source.split(' ').length === 1) {
        if(Number.isInteger(+source)) {
            wires[destination] = +source;
        }
        else if(wires[source] !== undefined) {
            wires[destination] = wires[source];
        }
    }
    else if(line.startsWith("NOT")) {
        const leftOp = source.substring(4);
        if(wires[leftOp] !== undefined) {
            const notBitwise = bitwiseNotOp(wires[leftOp]);
            wires[destination] = notBitwise;
        }
    }
    else {
        const [leftOp, op, rightOp] = source.split(' ');
        if((Number.isInteger(+leftOp) && wires[rightOp] !== undefined) ||
            (Number.isInteger(+rightOp) && wires[leftOp] !== undefined) || 
            (wires[leftOp] !== undefined && wires[rightOp] !== undefined)) {
            if(op === 'AND') {
                wires[destination] = (Number.isInteger(+leftOp) ? +leftOp : wires[leftOp]) & (Number.isInteger(+rightOp) ? +rightOp : wires[rightOp]);
            }
            else if(op === 'OR') {
                wires[destination] = (Number.isInteger(+leftOp) ? +leftOp : wires[leftOp]) | (Number.isInteger(+rightOp) ? +rightOp : wires[rightOp]);
            }
            else if(op === 'LSHIFT') {
                wires[destination] = wires[leftOp] << +rightOp;
            }
            else if(op === 'RSHIFT') {
                wires[destination] = wires[leftOp] >> +rightOp;
            }
        }
    }

    if(wires['a'] !== undefined) foundResult = true;

    lineIdx++;
    if(lineIdx === input.length) {
        lineIdx = 0;
    }
}

function bitwiseNotOp(x) {
    let numToBinary = (+x).toString(2);
    numToBinary = "0000000000000000".substring(numToBinary.length) + numToBinary;

    let bitwiseNotNumBinary = '';
    for(let i = 0; i < numToBinary.length; i++) {
        if(numToBinary[i] === '0') bitwiseNotNumBinary += '1';
        else bitwiseNotNumBinary += '0';
    }

    return parseInt(bitwiseNotNumBinary, 2);
}

console.log(wires['a']);