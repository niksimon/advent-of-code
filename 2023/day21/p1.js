const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = data[0].length;
const height = data.length;
let start = {};

for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        if(data[i][j] === 'S') {
            start = {x: j, y: i};
        }
    }
}

const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
const queue = [{x: start.x, y: start.y, steps: 0}];
const maxSteps = 64;
const endPlots = new Set();
const visited = new Set();

while(queue.length > 0) {
    const pos = queue.shift();

    if(pos.steps % 2 === 0) {
        endPlots.add(`${pos.x},${pos.y}`);
        if(pos.steps === maxSteps) {
            continue;
        }
    }

    for(const dir of dirs) {
        const newPos = {x: pos.x + dir[0], y: pos.y + dir[1]};
        if(!visited.has(`${newPos.x},${newPos.y}`) && newPos.x >= 0 && newPos.x < width && newPos.y >= 0 && newPos.y < height && data[newPos.y][newPos.x] !== '#') {
            queue.push({...newPos, steps: pos.steps + 1});
            visited.add(`${newPos.x},${newPos.y}`);
        }
    }
}

console.log(endPlots.size);