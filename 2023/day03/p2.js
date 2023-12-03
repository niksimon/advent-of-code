const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = data[0].length;
const height = data.length;

let sum = 0;

// find all numbers
const numbers = [];
let id = 1;

for(let i = 0; i < height; i++) {
    let num = '';
    let x = [];

    for(let j = 0; j < width; j++) {
        const current = data[i][j];
        if(Number.isInteger(+current)) {
            num += current;
            x.push(j);
        }
        if(num !== '' && (!Number.isInteger(+current) || j === width - 1)) {
            numbers.push({id: id++, num: +num, y: i, x: x.slice()});

            num = '';
            x = [];
        }
    }
}

// find all gears
for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        const current = data[i][j];
        if(current === '*') {
            const neighbourNumbers = new Set();

            // find all number neighbours
            for(let k = -1; k <= 1; k++) {
                for(let l = -1; l <= 1; l++) {
                    if(i + k >= 0 && i + k < height && j + l >= 0 && j + l < width && Number.isInteger(+data[i + k][j + l])) {
                        const neighbourNum = numbers.find(n => n.y === i + k && n.x.includes(j + l));
                        neighbourNumbers.add(neighbourNum);
                    }
                }
            }

            if(neighbourNumbers.size === 2) {
                const nums = [...neighbourNumbers];
                sum += nums[0].num * nums[1].num;
            }
        }
    }
}

console.log(sum);