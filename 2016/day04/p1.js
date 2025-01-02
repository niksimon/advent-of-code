const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let sum = 0;

for(const line of input) {
    const name = line.substring(0, line.lastIndexOf('-')).replaceAll('-', '');
    const id = +line.substring(line.lastIndexOf('-') + 1, line.indexOf('['));
    const checksum = line.substring(line.indexOf('[') + 1, line.length - 1);

    const countChars = {};

    for(const c of name) {
        countChars[c] = (countChars[c] || 0) + 1;
    }

    const realChecksum = Object.keys(countChars).sort((a, b) => countChars[b] == countChars[a] ? a.localeCompare(b) : countChars[b] - countChars[a]).slice(0, 5).join('');

    if(realChecksum == checksum) {
        sum += id;
    }
}

console.log(sum);