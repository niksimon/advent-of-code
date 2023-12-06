const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const times = data[0].split(":")[1].trim().replace(/\s\s+/g, ' ').split(" ").map(e => +e);
const distances = data[1].split(":")[1].trim().replace(/\s\s+/g, ' ').split(" ").map(e => +e);

let result = 1;

for(let i = 0; i < times.length; i++) {
    let count = 0;
    for(let ms = 1; ms < times[i]; ms++) {
        const dist = (times[i] - ms) * ms;
        if(dist > distances[i]) {
            count++;
        }
    }
    result *= count;
}

console.log(result);