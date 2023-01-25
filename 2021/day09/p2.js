const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const heightMap = inputs.map(line => line.split('').map(n => +n));
const mapWidth = heightMap[0].length;
const mapHeight = heightMap.length;
const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const lowPoints = [];

for(let i = 0; i < mapHeight; i++) {
    row: for(let j = 0; j < mapWidth; j++) {
        const point = heightMap[i][j];
        for(const dir of directions) {
            const [ni, nj] = [i + dir[0], j + dir[1]];
            if(nj >= 0 && nj < mapWidth && ni >= 0 && ni < mapHeight && heightMap[ni][nj] <= point) {  
                continue row;
            }
        }
        lowPoints.push([i, j]);
    }
}

const basins = [];

for(const lowPoint of lowPoints) {
    const queue = [lowPoint];
    const visited = new Set();
    visited.add(`${lowPoint[0]},${lowPoint[1]}`);
    let size = 1;
    while(queue.length > 0) {
        const point = queue.shift();
        for(const dir of directions) {
            const [ni, nj] = [point[0] + dir[0], point[1] + dir[1]];
            if(nj >= 0 && nj < mapWidth && ni >= 0 && ni < mapHeight && heightMap[ni][nj] < 9 && heightMap[ni][nj] > heightMap[point[0]][point[1]] && !visited.has(`${ni},${nj}`)) {  
                queue.push([ni, nj]);
                visited.add(`${ni},${nj}`);
                size++;
            }
        }
    }
    basins.push(size);
}

basins.sort((a, b) => b - a);
console.log(basins[0] * basins[1] * basins[2]);