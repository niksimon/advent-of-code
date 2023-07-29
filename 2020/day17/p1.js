const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let cubes = new Map();

for(let i = 0; i < inputs.length; i++) {
    for(let j = 0; j < inputs.length; j++) {
        cubes.set(`${j},${i},0`, inputs[i][j] === '#' ? 1 : 0);
    }
}

let cycle = 1;
let start = -1;
let end = inputs.length;

while(cycle <= 6) {
    const tmpCubes = new Map(cubes);
    for(let z = start; z <= cycle; z++) {
        for(let y = start; y <= end; y++) {
            for(let x = start; x <= end; x++) {
                const cube = `${x},${y},${z}`;
                const n = countActiveNeighbours(cube);
                if(cubes.get(cube) === 1 && (n !== 2 && n !== 3)) {
                    tmpCubes.set(cube, 0);
                }
                else if((!cubes.has(cube) || cubes.get(cube) === 0) && n === 3) {
                    tmpCubes.set(cube, 1);
                }
            }
        }
    }
    cubes = tmpCubes;
    start--;
    end++;
    cycle++;
}

let result = 0;
for(const val of cubes.values()) {
    if(val === 1) result++;
}
console.log(result);

function countActiveNeighbours(cube) {
    let [x, y, z] = cube.split(',').map(e => +e);
    let count = 0;
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            for(let k = -1; k <= 1; k++) {
                if(i === 0 && j === 0 && k === 0) {
                    continue;
                }
                const neighbour = `${x + k},${y + j},${z + i}`;
                if(cubes.get(neighbour) === 1) {
                    count++;
                }
            }
        }
    }
    return count;
}