const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const plants = new Set();
const regions = [];
const width = data[0].length;
const height = data.length;
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
        plants.add(`${x},${y}`);
    }
}

while(plants.size > 0) {
    const start = [...plants][0].split(',').map(e => +e);
    const region = {name: data[start[1]][start[0]], path: [[start[0], start[1]]]};
    const queue = [[start[0], start[1]]];
    plants.delete(`${start[0]},${start[1]}`);

    while(queue.length > 0) {
        const currentPos = queue.shift();

        for(const dir of dirs) {
            const nextPos = {x: currentPos[0] + dir[0], y: currentPos[1] + dir[1]};
            if(nextPos.x >= 0 && nextPos.x < width && nextPos.y >= 0 && nextPos.y < height && data[nextPos.y][nextPos.x] === region.name && plants.has(`${nextPos.x},${nextPos.y}`)) {
                plants.delete(`${nextPos.x},${nextPos.y}`);
                region.path.push([nextPos.x, nextPos.y]);
                queue.push([nextPos.x, nextPos.y]);
            }
        }
    }

    regions.push(region);
}

let result = 0;

for(const region of regions) {
    const area = region.path.length;
    let totalPerimeter = 0;

    for(const pos of region.path) {
        let plantPerimeter = 0;
        for(const dir of dirs) {
            const nextPos = {x: pos[0] + dir[0], y: pos[1] + dir[1]};
            if(nextPos.x < 0 || nextPos.x >= width || nextPos.y < 0 || nextPos.y >= height || data[nextPos.y][nextPos.x] !== region.name) {
                plantPerimeter++;
            }
        }
        totalPerimeter += plantPerimeter;
    }

    result += area * totalPerimeter;
}

console.log(result);