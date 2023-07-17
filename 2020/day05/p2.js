const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const seats = [];

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
    seats.push({row: lower, column: left, id: seatID});
}

seats.sort((a, b) => a.id - b.id);

for(let i = 1; i < seats.length; i++) {
    if(seats[i].id - seats[i - 1].id !== 1) {
        console.log(`Found ID between ${seats[i - 1].id} and ${seats[i].id}`);
        break;
    }
}