const fs = require('fs');
const diskMap = fs.readFileSync('./input.txt', 'utf-8');

let id = 0;
let blocks = [];
let emptyCount = 0;

for(let i = 0; i < diskMap.length; i++) {
    if(i % 2 === 0) {
        for(let j = 0; j < diskMap[i]; j++) {
            blocks.push(id);
        }
        id++;
    }
    else {
        blocks.push(...'.'.repeat(diskMap[i]).split(''));
        emptyCount += +diskMap[i];
    }
}

for(let i = blocks.length - 1; i >= blocks.length - emptyCount; i--) {
    const emptyFileIdx = blocks.indexOf('.');

    if(blocks[i] !== '.') {
        blocks[emptyFileIdx] = blocks[i];
        blocks[i] = '.';
    }
}

let checksum = 0;

for(let i = 0; i < blocks.length && blocks[i] !== '.'; i++) {
    checksum += i * blocks[i];
}

console.log(checksum);