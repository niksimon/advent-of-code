const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;

for(const line of data) {
    const splitLine = line.split(":");
    const max = {blue: 0, green: 0, red: 0};

    for(const bag of splitLine[1].split(";")) {
        for(const set of bag.split(",").map(e => e.trim())) {
            const [count, color] = set.split(" ");
            max[color] = Math.max(max[color], count);
        }
    }

    sum += max.blue * max.green * max.red;
}

console.log(sum);