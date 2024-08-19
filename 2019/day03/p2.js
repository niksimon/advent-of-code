const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const lines = [data[0].split(','), data[1].split(',')];
const linesCoords = [new Map(), new Map()];

const intersections = new Set();

let minStepsSum = 99999999;

let pos = [0, 0];
const dirs = {R: [1, 0], L: [-1, 0], U: [0, 1], D: [0, -1]};

for(let l = 0; l < 2; l++) {
    let totalSteps = 1;
    for(const d of lines[l]) {
        const dir = d[0];
        const steps = +d.substring(1);
    
        for(let i = 0; i < steps; i++) {
            pos[0] += dirs[dir][0];
            pos[1] += dirs[dir][1];

            if(!linesCoords[l].has(`${pos[0]},${pos[1]}`)) {
                linesCoords[l].set(`${pos[0]},${pos[1]}`, totalSteps);
            }

            if(l > 0 && linesCoords[0].has(`${pos[0]},${pos[1]}`)) {
                minStepsSum = Math.min(minStepsSum, linesCoords[0].get(`${pos[0]},${pos[1]}`) + linesCoords[1].get(`${pos[0]},${pos[1]}`));
            }

            totalSteps++;
        }
        
    }
    pos = [0, 0];
}

console.log(minStepsSum);