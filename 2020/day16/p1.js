const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const ranges = new Set();
let i = 0;

// get ranges
while(inputs[i] !== '') {
    let range = inputs[i].split(":")[1].trim().split(" or ");
    for(const r of range) {
        const [low, high] = r.split('-').map(e => +e);
        for(let j = low; j <= high; j++) {
            ranges.add(j);
        }
    }
    i++;
}

// skip your ticket
i += 5;

// find invalid tickets
let errorRate = 0;
while(i < inputs.length) {
    const tickets = inputs[i].split(',').map(e => +e);
    for(const t of tickets) {
        if(!ranges.has(t)) {
            //console.log(`Invalid ticket: ${t}`);
            errorRate += t;
        }
    }
    i++;
}

console.log(errorRate);