const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const output = 19690720;

for(let i = 0; i <= 99; i++) {
    for(let j = 0; j <= 99; j++) {
        const opcodes = data[0].split(',').map(x => +x);
        let pos = 0;

        opcodes[1] = i;
        opcodes[2] = j;

        while(opcodes[pos] !== 99) {
            const [p1, p2, p3] = [opcodes[pos + 1], opcodes[pos + 2], opcodes[pos + 3]];
            if(opcodes[pos] === 1) {
                opcodes[p3] = opcodes[p1] + opcodes[p2];
            }
            else if(opcodes[pos] === 2) {
                opcodes[p3] = opcodes[p1] * opcodes[p2];
            }
            else {
                console.log('err');
                break;
            }
            pos += 4;
        }

        if(opcodes[0] === output) {
            console.log(`100 * ${i} + ${j} = ${100 * i + j}`);
        }
    }
}