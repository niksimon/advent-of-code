const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const map = {};
let i = 0;
let result = 0;

while(data[i] !== '') {
    const [key, value] = data[i++].split('|');
    (map[key] ??= []).push(value);
}

i++;

while(i < data.length) {
    const update = data[i++];
    const pages = update.split(',');

    pages.sort((a, b) => {
        if(map[a]?.includes(b)) return -1;
        if(map[b]?.includes(a)) return 1;
        return 0;
    });

    if(pages.join(',') !== update) {
        result += +pages[Math.floor(pages.length / 2)];
    }
}

console.log(result);