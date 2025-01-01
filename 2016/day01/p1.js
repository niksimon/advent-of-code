const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const steps = input[0].split(', ');
const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const pos = {x: 0, y: 0, dir: 0};

for(const step of steps) {
    pos.dir += step[0] === 'R' ? 1 : -1;
    if(pos.dir > 3) {
        pos.dir = 0;
    }
    else if (pos.dir < 0) {
        pos.dir = 3;
    }

    const move = +step.substring(1);
    pos.x += dirs[pos.dir][0] * move;
    pos.y += dirs[pos.dir][1] * move;
}

console.log(Math.abs(pos.x) + Math.abs(pos.y));