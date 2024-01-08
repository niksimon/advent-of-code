const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

let lights = new Set();

let width = input[0].length;
let height = input.length;

for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[0].length; j++) {
        if(input[i][j] === '#') {
            lights.add(`${j},${i}`);
        }
    }
}

// printMap();

for(let i = 0; i < 100; i++) {
    let newLights = new Set();
    let offLights = new Set();

    for(const light of lights) {
        let [x, y] = light.split(',').map(e => +e);
        const onNeighboursCount = getNeighbours(x, y, offLights);

        if(onNeighboursCount === 2 || onNeighboursCount === 3) {
            newLights.add(`${x},${y}`);
        }
    }

    for(const light of offLights) {
        let [x, y] = light.split(',').map(e => +e);
        const onNeighboursCount = getNeighbours(x, y);

        if(onNeighboursCount === 3) {
            newLights.add(`${x},${y}`);
        }
    }

    lights = new Set(newLights);

    // printMap();
}

console.log(lights.size);

function getNeighbours(x, y, offLights = null) {
    let onNeighboursCount = 0;
    
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            let [nX, nY] = [x + i, y + j];

            if(i === 0 && j === 0 || nX < 0 || nX >= width || nY < 0 || nY >= height) continue;

            if(lights.has(`${nX},${nY}`)) {
                onNeighboursCount++;
            }
            else if(offLights !== null) {
                offLights.add(`${nX},${nY}`);
            }
        }
    }

    return onNeighboursCount;
}

function printMap() {
    for(let i = 0; i < height; i++) {
        let line = '';
        for(let j = 0; j < width; j++) {
            line += lights.has(`${j},${i}`) ? '#' : '.';
        }
        console.log(line);
    }
    console.log();
}