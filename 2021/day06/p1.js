const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const fish = inputs[0].split(',');

for(let days = 80; days > 0; days--) {
    const len = fish.length;
    for(let i = 0; i < len; i++) {
        if(fish[i] === 0) {
            fish[i] = 6;
            fish.push(8);
        }
        else {
            fish[i]--;
        }
    }
}

console.log(fish.length);