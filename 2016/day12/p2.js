const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const registers = {a: 0, b: 0, c: 1, d: 0};
let i = 0;

while(i < input.length) {
    const s = input[i].split(' ');

    if(s[0] === 'cpy') {
        registers[s[2]] = (registers[s[1]] ?? s[1]);
    }
    else if(s[0] === 'inc') {
        registers[s[1]]++;
    }
    else if(s[0] === 'dec') {
        registers[s[1]]--;
    }
    else if(s[0] === 'jnz' && (registers[s[1]] ?? s[1]) != 0) {
        i += +s[2];
        continue;
    }

    i++;
}

console.log(registers.a);