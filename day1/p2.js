const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

let a = data.split("\r\n");
let b = [0];
for(let i = 0, j = 0; i < a.length; i++) {
    if(a[i] === "") {
        j++;
        b[j] = 0;
        continue;
    }
    b[j] += +a[i];
}

b.sort((a,b) => b - a);

console.log(b[0] + b[1] + b[2]);