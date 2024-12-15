const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');

const map = {};
const player = [];
const dataMap = data[0].split('\r\n');
const moves = data[1].split('\r\n').join('');
const dirs = {'<': [-1, 0], '>': [1, 0], '^': [0, -1], 'v': [0, 1]};
const width = dataMap[0].length;
const height = dataMap.length;

for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        if(dataMap[i][j] === '@') {
            player[0] = j;
            player[1] = i;
        }
        else if(dataMap[i][j] === '#' || dataMap[i][j] === 'O') {
            map[`${j},${i}`] = dataMap[i][j];
        }
    }
}

for(const move of moves) {
    const dir = dirs[move];
    const pos = [player[0] + dir[0], player[1] + dir[1]];
    const boxesToMove = [];
    let canMove = false;

    while(map[`${pos[0]},${pos[1]}`] !== '#') {
        if(!map[`${pos[0]},${pos[1]}`]) {
            canMove = true;
            break;
        }
        boxesToMove.push([pos[0], pos[1]]);
        pos[0] += dir[0];
        pos[1] += dir[1];
    }

    if(canMove) {
        player[0] += dir[0];
        player[1] += dir[1];
        boxesToMove.reverse().forEach(b => {
            delete map[`${b[0]},${b[1]}`];
            map[`${b[0] + dir[0]},${b[1] + dir[1]}`] = 'O';
        });
    }
}

let result = 0;

for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        if(map[`${j},${i}`] === 'O') {
            result += i * 100 + j;
        }
    }
}

console.log(result);