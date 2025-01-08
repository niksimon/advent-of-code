const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const discs = [];

for(const line of input) {
    const split = line.substring(0, line.length - 1).split(' ');
    const [count, pos] = [+split[3], +split[split.length - 1]];
    discs.push({count, pos});
}

discs.push({count: 11, pos: 0});

let time = 0;
let blocked = true;

while(blocked) {
    let i = ++time;
    blocked = false;

    for(const disc of discs) {
        const nextPos = (disc.pos + i++) % disc.count;

        if(nextPos !== 0) {
            blocked = true;
            break; 
        }
    }
}

console.log(time - 1);