const fs = require('fs');
const md5 = require('js-md5');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const doorId = input[0];
let password = ['', '', '', '', '', '', '', ''];
let count = 0;
let idx = 0;

while(count < 8) {
    const md5Hash = md5(`${doorId}${idx}`);
    if(md5Hash.startsWith('00000')) {
        const pos = md5Hash[5];
        if(password[pos] === '') {
            password[pos] = md5Hash[6];
            count++;
        }
    }
    idx++;
}

console.log(password.join(''));