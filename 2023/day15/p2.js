const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sequence = data[0].split(',');
const boxes = {};

for(const step of sequence) {
    if(step.includes('=')) {
        const box = theHashAlgo(step.split('=')[0]);
        const label = step.split('=')[0];
        const focalLength = +step.split('=')[1];
        if(!boxes[box]) {
            boxes[box] = [{label, focalLength}];
        }
        else {
            const indexOfLabel = boxes[box].findIndex(e => e.label === label);
            if(indexOfLabel > -1) {
                Object.assign(boxes[box][indexOfLabel], {label, focalLength});
            }
            else {
                boxes[box].push({label, focalLength});
            }
        }
    }
    else if(step.includes('-')) {
        const box = theHashAlgo(step.split('-')[0]);
        const label = step.split('-')[0];
        const indexOfLabel = boxes[box]?.findIndex(e => e.label === label);
        if(boxes[box] && indexOfLabel > -1) {
            boxes[box].splice(indexOfLabel, 1);
        }
    }
}

let sum = 0;

for(const box of Object.keys(boxes)) {
    for(let i = 0; i < boxes[box].length; i++) {
        sum += (1 + +box) * (i + 1) * boxes[box][i].focalLength;
    }
}

console.log(sum);

function theHashAlgo(str) {
    let val = 0;
    for(let i = 0; i < str.length; i++) {
        const ascii = +str.charCodeAt(i);
        val += ascii;
        val *= 17;
        val %= 256;
    }
    return val;
}