const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

function isSafeReport(levels) {
    let dir = levels[1] - levels[0];
    let safe = true;

    for(let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];
        if(Math.abs(diff) < 1 || Math.abs(diff) > 3 || (dir * diff <= 0)) {
            safe = false;
            break;
        }
    }

    return safe;
}

let safeReports = 0;

for(let line of data) {
    const levels = line.split(' ');
    let safe = isSafeReport(levels);

    if(!safe) {
        for(let i = 0; i < levels.length; i++) {
            let newLevels = [...levels];
            newLevels.splice(i, 1);
            safe = isSafeReport(newLevels);
            if(safe) {
                break;
            }
        }
    }

    if(safe) {
        safeReports++;
    }
}

console.log(safeReports);