const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;
const map = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9};

function findNum(line, i) {
    if(Number.isInteger(+line[i])) {
        return +line[i];
    }
    for(const num of Object.keys(map)) {
        if(line.substring(i).indexOf(num) === 0) {
            return map[num];
        }
    }
    return 0;
}

for(let line of data) {
    let num1 = 0;
    let num2 = 0;
    for(let i = 0; i < line.length; i++) {
        num1 = findNum(line, i);
        if(num1 !== 0) break;
    }
    for(let i = line.length - 1; i >= 0; i--) {
        num2 = findNum(line, i);
        if(num2 !== 0) break;
    }
    sum += +`${num1}${num2}`;
}

console.log(sum);