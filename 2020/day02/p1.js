const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let valid = 0;

for(const line of inputs) {
    const split = line.split(' ');

    const [lowest, highest] = split[0].split('-');
    const letter = split[1][0];
    const password = split[2];

    let count = 0;
    for(let i = 0; i < password.length; i++) {
        if(password[i] === letter) count++;
    }

    if(count >= lowest && count <= highest) {
        valid++;
    }
}

console.log(valid);