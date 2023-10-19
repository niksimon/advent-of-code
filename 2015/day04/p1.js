const fs = require('fs');
const md5 = require('md5');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const key = input[0];
let i = 1;
let md5hash = md5(`${key}${i}`);

while(!md5hash.startsWith('00000')) {
    i++;
    md5hash = md5(`${key}${i}`);
}

console.log(i);