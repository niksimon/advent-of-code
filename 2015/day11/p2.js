const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let password = input[0];
let validCount = 0;

while(validCount < 2) {
    let newPass = [];
    let increaseNext = false;
    for(let i = password.length - 1; i >= 0; i--) {
        let nextCharCode = password.charCodeAt(i);

        if(increaseNext || i === password.length - 1) nextCharCode++;

        if(nextCharCode === 123) {
            increaseNext = true;
            nextCharCode = 97;
        }
        else {
            increaseNext = false;
        }

        let newChar = String.fromCharCode(nextCharCode);
        newPass.unshift(newChar);
    }
    password = newPass.join('');

    if(valid(password)) {
        validCount++;
    }
}

console.log(password);

function valid(pass) {
    if(pass.includes('i') || pass.includes('o') || pass.includes('l')) return false;

    let doublePairs = [];
    let increasingStraight = 0;

    for(let i = 0; i < pass.length - 1; i++) {
        if(i < pass.length - 2 && pass.charCodeAt(i + 1) - pass.charCodeAt(i) === 1 && pass.charCodeAt(i + 2) - pass.charCodeAt(i) === 2) {
            increasingStraight++;
        }
        if(pass[i + 1] === pass[i] && !doublePairs.includes(`${pass[i]},${pass[i + 1]}`)) {
            doublePairs.push(`${pass[i]},${pass[i + 1]}`);
        }
    }

    return doublePairs.length >= 2 && increasingStraight === 1;
}