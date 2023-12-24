const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const start = {x: 1, y: 0, path: ['1,0']};
const dirs = {'>': [1, 0, '<'], '<': [-1, 0, '>'], '^': [0, -1, 'v'], 'v': [0, 1, '^']};
const queue = [start];
let longestPath = [];

while(queue.length > 0) {
    const pos = queue.shift();

    if(pos.x === data[0].length - 2 && pos.y === data.length - 1) {
        if(longestPath.length < pos.path.length) {
            longestPath = pos.path;
        }
        continue;
    }

    if('><v^'.includes(data[pos.y][pos.x])) {
        const newPos = {x: pos.x + dirs[data[pos.y][pos.x]][0], y: pos.y + dirs[data[pos.y][pos.x]][1], path: pos.path.slice()};
        newPos.path.push(`${newPos.x},${newPos.y}`);
        queue.push(newPos);
        continue;
    }

    for(const dir of Object.keys(dirs)) {
        const newPos = {x: pos.x + dirs[dir][0], y: pos.y + dirs[dir][1], path: pos.path.slice()};

        if(!pos.path.includes(`${newPos.x},${newPos.y}`) && newPos.x >= 0 && newPos.x < data[0].length && newPos.y >= 0 && newPos.y < data.length && data[newPos.y][newPos.x] !== '#' && data[newPos.y][newPos.x] !== dirs[dir][2]) {
            newPos.path.push(`${newPos.x},${newPos.y}`);
            queue.push(newPos);
        }
    }
}

console.log(longestPath.length - 1);