const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const count = +input[0];
const elves = new Array(count).fill(1);

main: while(true) {
    for(let i = 0; i < elves.length; i++) {
        if(elves[i] === 0) continue;

        let nextElf = (i + 1) % count;

        while(elves[nextElf] === 0) {
            nextElf++;
            if(nextElf === elves.length) {
                nextElf = 0;
            }
        }

        elves[i] += elves[nextElf];
        elves[nextElf] = 0;

        if(elves[i] === count) {
            console.log(i + 1);
            break main;
        }
    }
}