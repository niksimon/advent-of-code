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

for(const f of folding) {
    grid = fold(f[0], f[1], grid);
}

printGrid(grid);

function fold(side, pos, grid) {
    const newGrid = [];
    const gridWidth = grid[0].length;
    const gridHeight = grid.length;

    pos = +pos;

    if(side === "y") {
        for(let i = 0; i < pos; i++) {
            newGrid[i] = new Array(gridWidth).fill(0);
        }

        for(let i = 0; i < gridHeight; i++) {
            for(let j = 0; j < gridWidth; j++) {
                if(i < pos) {
                    newGrid[i][j] = grid[i][j];
                }
                else if(i > pos) {
                    newGrid[pos - (i - pos)][j] += grid[i][j];
                }
            }
        }
    }
    else {
        for(let i = 0; i < gridHeight; i++) {
            newGrid[i] = new Array(pos).fill(0);
        }

        for(let i = 0; i < gridHeight; i++) {
            for(let j = 0; j < gridWidth; j++) {
                if(j < pos) {
                    newGrid[i][j] = grid[i][j];
                }
                else if(j > pos) {
                    newGrid[i][pos - (j - pos)] += grid[i][j];
                }
            }
        }
    }

    return newGrid;
}

function printGrid(grid) {
    for(let i = 0; i < grid.length; i++) {
        console.log(grid[i].map(e => e > 0 ? '█' : ' ').join(''));
    }
}