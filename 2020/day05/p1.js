const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let highestSeatID = 0;

for(const seat of inputs) {
    let lower = 0, upper = 127;
    let left = 0, right = 7;
    for(let i = 0; i < seat.length; i++) {
        if(seat[i] === 'F') {
            upper -= (upper - lower + 1) / 2;
        }
        if(seat[i] === 'B') {
            lower += (upper - lower + 1) / 2;
        }
        if(seat[i] === 'L') {
            right -= (right - left + 1) / 2;
        }
        if(seat[i] === 'R') {
            left += (right - left + 1) / 2;
        }
    }
    const seatID = lower * 8 + left;
    highestSeatID = Math.max(highestSeatID, seatID)
    console.log(`${seat}: row ${lower}, column ${left}, seat ID ${seatID}`);
}

console.log(`Highest seat ID: ${highestSeatID}`);