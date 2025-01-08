const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const diskLength = 35651584;
let a = input[0];

while(a.length < diskLength) {
    let b = '';

    for(let i = a.length - 1; i >= 0; i--) {
        b += a[i] === '0' ? '1' : '0';
    }
    
    a += '0' + b;
}

a = a.substring(0, diskLength);

while(a.length % 2 === 0) {
    let checksum = '';

    for(let i = 0; i < a.length; i += 2) {
        checksum += a[i] === a[i + 1] ? '1' : '0';
    }

    a = checksum;
}

console.log(a);