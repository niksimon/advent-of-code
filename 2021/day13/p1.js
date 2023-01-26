const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const dots = new Set();
const folding = [];
let grid = [];

let mapWidth = 0;
let mapHeight = 0;

let i = 0;
while((line = inputs[i++]) !== '') {
    const [x, y] = line.split(',').map(e => +e);
    mapWidth = x > mapWidth ? x : mapWidth;
    mapHeight = y > mapHeight ? y : mapHeight;
    dots.add(`${x},${y}`);
}
while(i < inputs.length) {
    folding.push(inputs[i++].split(" ")[2].split("="));
}

for(let i = 0; i <= mapHeight; i++) {
    grid[i] = [];
    for(let j = 0; j <= mapWidth; j++) {
        if(dots.has(`${j},${i}`)) {
            grid[i][j] = 1;
        }
        else {
            grid[i][j] = 0;
        }
    }
}

fold(folding[0][0], folding[0][1], grid);

function fold(side, pos, grid) {
    const newGrid = [];
    const gridWidth = grid[0].length;
    const gridHeight = grid.length;
    let visibleDots = 0;

    pos = +pos;

    if(side === "y") {
        for(let i = 0; i < pos; i++) {
            newGrid[i] = new Array(gridWidth).fill(0);
            for(let j = 0; j < gridWidth; j++) {
                if(grid[i][j] === 1 || grid[gridHeight - i - 1][j] === 1) {
                    newGrid[i][j] = 1;
                    visibleDots++;
                }
            }
        }
    }
    else if(side === "x") {
        for(let i = 0; i < gridHeight; i++) {
            newGrid[i] = new Array(pos).fill(0);
            for(let j = 0; j < pos; j++) {
                if(grid[i][j] === 1 || grid[i][gridWidth - j - 1] === 1) {
                    newGrid[i][j] = 1;
                    visibleDots++;
                }
            }
        }
    }

    console.log(visibleDots);
}