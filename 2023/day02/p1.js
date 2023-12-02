const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;
const colors = {blue: 14, green: 13, red: 12};

main: for(const line of data) {
    const splitLine = line.split(":");
    const id = +splitLine[0].split(" ")[1];

    for(const bag of splitLine[1].split(";")) {
        for(const set of bag.split(",").map(e => e.trim())) {
            const [count, color] = set.split(" ");
            if(count > colors[color]) {
                continue main;
            }
        }
    }

    sum += id;
}

console.log(sum);