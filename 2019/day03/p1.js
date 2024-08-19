const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const lines = [data[0].split(','), data[1].split(',')];
const linesCoords = [new Set(), new Set()];

const intersections = new Set();

let pos = [0, 0];
const dirs = {R: [1, 0], L: [-1, 0], U: [0, 1], D: [0, -1]};

for(let l = 0; l < 2; l++) {
    for(const d of lines[l]) {
        const dir = d[0];
        const steps = +d.substring(1);
    
        for(let i = 0; i < steps; i++) {
            pos[0] += dirs[dir][0];
            pos[1] += dirs[dir][1];
            linesCoords[l].add(`${pos[0]},${pos[1]}`);
            if(l > 0 && linesCoords[0].has(`${pos[0]},${pos[1]}`)) {
                intersections.add(`${pos[0]},${pos[1]}`);
            }
        }
    }
    pos = [0, 0];
}

console.log(Math.min(...[...intersections].map(x => Math.abs(x.split(',')[0]) + Math.abs(x.split(',')[1]))));