const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = data[0].length;
const height = data.length;

let sum = 0;

function checkNeighbours(pos) {
    // check left and right
    if(pos.left - 1 >= 0 && data[pos.y][pos.left - 1] !== '.' ||
       pos.right + 1 < width && data[pos.y][pos.right + 1] !== '.') {
        return true;
    }

    // check top and bottom
    for(let i = pos.y - 1; i <= pos.y + 1; i += 2) {
        if(i < 0 || i >= height) {
            continue;
        }
        for(let j = Math.max(0, pos.left - 1); j <= Math.min(width - 1, pos.right + 1); j++) {
            if(data[i][j] !== '.') {
                return true;
            }
        }
    }

    return false;
}

for(let i = 0; i < height; i++) {
    let num = '';
    let pos = {left: null, right: null};

    for(let j = 0; j < width; j++) {
        const current = data[i][j];
        if(Number.isInteger(+current)) {
            num += current;
            pos.left ??= j;
            pos.right = j;
        }
        if(num !== '' && (!Number.isInteger(+current) || j === width - 1)) {
            const hasSymbolNeighbour = checkNeighbours({y: i, ...pos});
            sum += hasSymbolNeighbour ? +num : 0;

            num = '';
            pos = {left: null, right: null};
        }
    }
}

console.log(sum);