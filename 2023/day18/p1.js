const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const dirs = {R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1]};
let nextPos = {x: 0, y: 0};
let prevPos = {x: 0, y: 0};
let area = 0;
let boundary = 0;

for(const line of data) {
    const [dir, steps, color] = line.split(' ');

    boundary += +steps;

    nextPos.x += +steps * dirs[dir][0];
    nextPos.y += +steps * dirs[dir][1];
    
    area += prevPos.x * nextPos.y - nextPos.x * prevPos.y;

    prevPos.x = nextPos.x;
    prevPos.y = nextPos.y;
}

area = Math.abs(area) / 2;
console.log(area - boundary / 2 + 1 + boundary);