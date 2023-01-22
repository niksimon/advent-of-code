const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const bits = [];
for(let i = 0; i < inputs[0].length; i++) {
    bits.push([0, 0]);
}

for(const line of inputs) {
    for(let i = 0; i < line.length; i++) {
        bits[i][line[i]]++;
    }
}

let gamma = "", epsilon = "";

for(const b of bits) {
    gamma += b[0] > b[1] ? '0' : '1';
    epsilon += b[0] < b[1] ? '0' : '1';
}

console.log(binaryToDec(gamma) * binaryToDec(epsilon));

function binaryToDec(bin) {
    let dec = 0;
    for(let i = 0; i < bin.length; i++) {
        dec += bin[i] * Math.pow(2, bin.length - i - 1);
    }
    return dec;
}