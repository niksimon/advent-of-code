const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const directions = input[0];
let floor = 0;

for(let i = 0; i < directions.length; i++) {
    floor += directions[i] === '(' ? 1 : -1;
    if(floor === -1) {
        console.log(i + 1);
        break;
    }
}