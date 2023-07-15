const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const steps = [];
const cubes = new Set();

for(const line of inputs) {
    const [action, coords] = line.split(' ');
    const [x, y, z] = coords.split(',').map(e => e.split('=')).map(e => e[1].split('..').map(e => +e));
    steps.push({action: action, x: x, y: y, z: z});
}

//console.log(steps);

for(const step of steps) {
    for(let x = Math.max(step.x[0], -50); x <= Math.min(step.x[1], 50); x++) {
        for(let y = Math.max(step.y[0], -50); y <= Math.min(step.y[1], 50); y++) {
            for(let z = Math.max(step.z[0], -50); z <= Math.min(step.z[1], 50); z++) {
                if(step.action === 'on') {
                    cubes.add(`${x},${y},${z}`);
                }
                else {
                    cubes.delete(`${x},${y},${z}`);
                }
            }
        }
    }
}

console.log(`Cubes: ${cubes.size}`);