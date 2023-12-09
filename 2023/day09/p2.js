const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;

for(const line of data) {
    let history = line.split(' ').map(e => +e);
    const firstValues = [];

    while(!history.every(e => e === 0)) {
        const next = [];
        for(let i = 1; i < history.length; i++) {
            next.push(history[i] - history[i - 1]);
        }
        firstValues.unshift(history[0]);
        history = next;
    }

    sum += firstValues.reduce((a, c) => c - a);
}

console.log(`Sum: ${sum}`);