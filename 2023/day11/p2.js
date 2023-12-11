const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const emptyRows = new Set();
const emptyColumns = new Set();
const galaxies = [];

for(let i = 0; i < data[0].length; i++) {
    let isEmptyColumn = true;
    for(let j = 0; j < data.length; j++) {
        if(data[j][i] === '#') {
            galaxies.push([i,j]);
            isEmptyColumn = false;
        }
        if(!data[j].includes('#')) {
            emptyRows.add(j);
        }
    }
    if(isEmptyColumn) {
        emptyColumns.add(i);
    }
}

let sum = 0;

for(let i = 0; i < galaxies.length - 1; i++) {
    for(let j = i + 1; j < galaxies.length; j++) {
        const [x1, y1] = [galaxies[i][0], galaxies[i][1]];
        const [x2, y2] = [galaxies[j][0], galaxies[j][1]];
        const emptyRowsBetween = [...emptyRows].filter(e => e > Math.min(y1, y2) && e < Math.max(y1, y2)).length;
        const emptyColumnsBetween = [...emptyColumns].filter(e => e > Math.min(x1, x2) && e < Math.max(x1, x2)).length;
        const distance = Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]) + emptyRowsBetween * 999999 + emptyColumnsBetween * 999999;
        //console.log(`Distance from [${x1},${y1}] to [${x2},${y2}] = ${distance}, emptyRowsBetween: ${emptyRowsBetween}, emptyColumnsBetween: ${emptyColumnsBetween}`);
        sum += distance;
    }
}

console.log(sum);