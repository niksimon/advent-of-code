const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let count = 0;

for(const line of inputs) {
    const vals = line.split(' | ')[1].split(' ');
    vals.forEach(v => {
        if([2, 3, 4, 7].includes(v.length)) {
            count++;
        }
    })
}

console.log(count);