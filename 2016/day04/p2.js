const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

for(const line of input) {
    const name = line.substring(0, line.lastIndexOf('-')).replaceAll('-', ' ');
    const id = +line.substring(line.lastIndexOf('-') + 1, line.indexOf('['));

    let realName = '';

    for(const c of name) {
        if(c === ' ') {
            realName += ' ';
            continue;
        }

        const charCode = 97 + (c.charCodeAt() - 97 + id) % 26;
        realName += String.fromCharCode(charCode);
    }

    if(realName.includes('northpole')) {
        console.log(realName, id);
    }
}