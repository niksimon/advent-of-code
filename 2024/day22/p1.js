const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(n => +n);

let sum = 0;

for(let secret of data) {
    for(let i = 0; i < 2000; i++) {
        secret = (secret ^ (secret << 6)) & 16777215;
        secret = (secret ^ (secret >> 5)) & 16777215;
        secret = (secret ^ (secret << 11)) & 16777215;
    }

    sum += secret;
}

console.log(sum);