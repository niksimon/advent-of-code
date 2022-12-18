const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

const cubes = new Set(inputs);

const next = [[0,0,1], [0,0,-1], [0,1,0], [0,-1,0], [1,0,0], [-1,0,0]];
let area = 0;

for(const cube of cubes) {
    let cubeArea = 6;
    const pos = cube.split(",").map(e => +e);
    for(const n of next) {
        if(cubes.has(`${pos[0] + n[0]},${pos[1] + n[1]},${pos[2] + n[2]}`)) {
            cubeArea--;
        }
    }
    area += cubeArea;
}

console.log(area);