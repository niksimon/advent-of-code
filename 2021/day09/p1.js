const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const heightMap = inputs.map(line => line.split('').map(n => +n));
const mapWidth = heightMap[0].length;
const mapHeight = heightMap.length;
const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let sum = 0;

for(let i = 0; i < mapHeight; i++) {
    row: for(let j = 0; j < mapWidth; j++) {
        const point = heightMap[i][j];
        for(const dir of directions) {
            const [ni, nj] = [i + dir[0], j + dir[1]];
            if(nj >= 0 && nj < mapWidth && ni >= 0 && ni < mapHeight && heightMap[ni][nj] <= point) {  
                continue row;
            }
        }
        sum += point + 1;
    }
}

console.log(sum);