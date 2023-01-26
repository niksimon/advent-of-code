const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const octopuses = inputs.map(e => e.split('').map(e => +e));
const area = octopuses.length * octopuses[0].length;

let steps = 0;
let flashes = 0;

while(flashes !== area) {
    flashes = 0;
    for(let i = 0; i < octopuses.length; i++) {
        for(let j = 0; j < octopuses[i].length; j++) {
            octopuses[i][j]++;
        }
    }

    for(let i = 0; i < octopuses.length; i++) {
        for(let j = 0; j < octopuses[i].length; j++) {
            if(octopuses[i][j] > 9) {
                flash(i, j, octopuses);
            }
        }
    }
    steps++;
}

console.log(steps);

function flash(i, j, octopuses) {
    octopuses[i][j] = 0;
    for(let k = -1; k <= 1; k++) {
        for(let l = -1; l <= 1; l++) {
            const [ni, nj] = [i + k, j + l];
            if(ni >= 0 && ni < octopuses.length && nj >= 0 && nj < octopuses[0].length && octopuses[ni][nj] > 0 && octopuses[ni][nj] < 10) {
                octopuses[ni][nj]++;
                if(octopuses[ni][nj] > 9) {
                    flash(ni, nj, octopuses);
                }
            }
        }
    }
    flashes++;
}