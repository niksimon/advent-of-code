const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
let nextPos = {x: 0, y: 0};
let prevPos = {x: 0, y: 0};
let area = 0;
let boundary = 0;

for(const line of data) {
    const color = line.split(' ')[2].substring(2, line.split(' ')[2].length - 1);
    const dir = dirs[color[color.length - 1]];
    const steps = parseInt(color.substring(0, color.length - 1), 16);

    boundary += +steps;

    nextPos.x += +steps * dir[0];
    nextPos.y += +steps * dir[1];
    
    area += prevPos.x * nextPos.y - nextPos.x * prevPos.y;

    prevPos.x = nextPos.x;
    prevPos.y = nextPos.y;
}

area = Math.abs(area) / 2;
console.log(area - boundary / 2 + 1 + boundary);