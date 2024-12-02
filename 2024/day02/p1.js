const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let safeReports = 0;

for(let line of data) {
    const levels = line.split(' ');
    const dir = levels[1] - levels[0];
    let safe = true;

    for(let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];
        if(Math.abs(diff) < 1 || Math.abs(diff) > 3 || (dir * diff <= 0)) {
            safe = false;
            break;
        }
    }

    if(safe) {
        safeReports++;
    }
}

console.log(safeReports);