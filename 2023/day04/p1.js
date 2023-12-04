const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let points = 0;

for(const line of data) {
    const lineSplit = line.split(":");
    const [winningNums, myNums] = lineSplit[1].split("|").map(e => e.trim().replaceAll('  ', ' ').split(" "));
    
    const inBoth = myNums.filter(e => winningNums.includes(e));

    if(inBoth.length > 0) {
        points += Math.pow(2, inBoth.length - 1);
    }
}

console.log(points);