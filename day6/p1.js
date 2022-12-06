const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

for(let i = 3; i < data.length; i++) {
    let str = data.substring(i - 3, i + 1);
    if(new Set(str).size === 4) {
        console.log(i + 1);
        break;
    }
}