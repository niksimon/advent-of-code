const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

const cubes = new Set(inputs);
const faces = new Set();

// find max x, y, z
let areaSize = 0;
for(const cube of cubes) {
    for(const p of cube.split(',')) {
        areaSize = Math.max(areaSize, +p);
    }
}
areaSize++;

const facesDirections = [[0,0,0.5], [0,0,-0.5], [0,0.5,0], [0,-0.5,0], [0.5,0,0], [-0.5,0,0]];
const directions3D = [[0,0,1], [0,0,-1], [0,1,0], [0,-1,0], [1,0,0], [-1,0,0]];

for(const cube of cubes) {
    const pos = cube.split(",").map(e => +e);
    for(const dir of facesDirections) {
        const face = `${pos[0] + dir[0]},${pos[1] + dir[1]},${pos[2] + dir[2]}`;
        if(faces.has(face)) {
            faces.delete(face);
        }
        else {
            faces.add(face);
        }
    }
}

let surface = 0;
const queue = [[0, 0, 0]];
const visited = new Set();

while(queue.length > 0) {
    const pos = queue.shift();

    // check every face of current position
    for(const dir of facesDirections) {
        const face = `${pos[0] + dir[0]},${pos[1] + dir[1]},${pos[2] + dir[2]}`;
        if(faces.has(face)) {
            surface++;
        }
    }

    // put next positions in queue if they are not cubes, never visited before and within range -1 and areaSize
    for(const dir of directions3D) {
        const next = [pos[0] + dir[0], pos[1] + dir[1], pos[2] + dir[2]];
        
        if(next[0] >= -1 && next[0] <= areaSize && next[1] >= -1 && next[1] <= areaSize && next[2] >= -1 && next[2] <= areaSize
            && !cubes.has(next.toString()) && !visited.has(next.toString())) {
            queue.push(next);
            visited.add(next.toString());
        }
    }
}

console.log(surface);