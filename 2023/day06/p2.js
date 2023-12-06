const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const time = +data[0].split(":")[1].trim().replace(/\s\s+/g, '');
const distance = +data[1].split(":")[1].trim().replace(/\s\s+/g, '');

let result = 0;

for(let ms = 0; ms < time; ms++) {
    const dist = (time - ms) * ms;
    if(dist > distance) {
        result++;
    }
}

console.log(result);