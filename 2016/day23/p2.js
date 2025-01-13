const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const registers = {a: 12, b: 0, c: 0, d: 0};
const toggleMap = {'inc': 'dec', 'dec': 'inc', 'jnz': 'cpy', 'cpy': 'jnz', 'tgl': 'inc'};
let i = 0;

while(i < input.length) {
    const s = input[i].split(' ');
    if(s[0] === 'tgl') {
        const toggleIdx = i + (registers[s[1]] ?? s[1]);
        if(toggleIdx >= 0 && toggleIdx < input.length) {
            const next = input[toggleIdx].split(' ')[0];
            input[toggleIdx] = toggleMap[next] + input[toggleIdx].substring(3);
        }
    }
    else if(s[0] === 'cpy' && registers[s[2]] !== undefined) {
        registers[s[2]] = +(registers[s[1]] ?? s[1]);
    }
    else if(s[0] === 'inc' && registers[s[1]] !== undefined) {
        registers[s[1]]++;
    }
    else if(s[0] === 'dec' && registers[s[1]] !== undefined) {
        registers[s[1]]--;
    }
    else if(s[0] === 'jnz' && (registers[s[1]] ?? s[1]) != 0) {
        i += +(registers[s[2]] ?? s[2]);
        continue;
    }

    i++;
}

console.log(registers.a);