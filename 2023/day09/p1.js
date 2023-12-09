const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;

for(const line of data) {
    let history = line.split(' ').map(e => +e);
    const lastValues = [];

    while(!history.every(e => e === 0)) {
        const next = [];
        for(let i = 1; i < history.length; i++) {
            next.push(history[i] - history[i - 1]);
        }
        lastValues.push(history[history.length - 1]);
        history = next;
    }

    sum += lastValues.reduce((a, c) => a + c);
}

console.log(`Sum: ${sum}`);