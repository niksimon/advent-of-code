const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

const inputs = data.split("\r\n");

let sum = 0;

for(const line of inputs) {
    const [firstHalf, secondHalf] = [line.substring(0, line.length / 2), line.substring(line.length / 2)];
    for(const c of firstHalf) {
        if(secondHalf.includes(c)) {
            if(c === c.toLowerCase()) {
                sum += c.charCodeAt() - 96;
            }
            else {
                sum += c.charCodeAt() - 38;
            }
            break;
        }
    }
}

console.log(sum);
