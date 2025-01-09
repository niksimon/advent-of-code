const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let row = input[0];
let safe = row.replaceAll('^', '').length;
const rowCount = 40;

for(let i = 0; i < rowCount - 1; i++) {
    let next = '';

    for(let j = 0; j < row.length; j++) {
        const prev = (row[j - 1] ?? '.') + row[j] + (row[j + 1] ?? '.');
        if(prev == '.^^' || prev == '^^.' || prev == '^..' || prev == '..^') {
            next += '^';
        }
        else {
            next += '.';
            safe++;
        }
    }

    row = next;
}

console.log(safe);