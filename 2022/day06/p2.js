const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

for(let i = 13; i < data.length; i++) {
    let str = data.substring(i - 13, i + 1);
    if(new Set(str).size === 14) {
        console.log(i + 1);
        break;
    }
}