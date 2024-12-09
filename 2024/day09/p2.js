const fs = require('fs');
const diskMap = fs.readFileSync('./input.txt', 'utf-8');

let id = 0;
let blocks = [];

for(let i = 0; i < diskMap.length; i++) {
    const size = +diskMap[i];
    blocks.push({id: i % 2 === 0 ? id++ : '.', size});
}

for(let i = blocks.length - 1; i > 0; i--) {
    const block = blocks[i];

    if(block.id !== '.') {
        const emptyFileIdx = blocks.findIndex(b => b.id === '.' && b.size >= block.size);
        if(emptyFileIdx !== -1 && emptyFileIdx < i) {
            const leftoverEmpty = blocks[emptyFileIdx].size - block.size;
            blocks[emptyFileIdx] = block;
            blocks[i] = {id: '.', size: block.size};

            if(leftoverEmpty > 0) {
                blocks.splice(emptyFileIdx + 1, 0, {id: '.', size: leftoverEmpty});
            }
        }
    }
}

let checksum = 0;
let pos = 0;

for(const block of blocks) {
    if(block.id !== '.') {
        for(let i = 0; i < block.size; i++) {
            checksum += pos++ * block.id;
        }
    }
    else {
        pos += block.size;
    }
}

console.log(checksum);