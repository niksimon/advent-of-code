const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let acc = 0, second = false, i = 0;
const steps = new Set();

while(!second) {
    const [command, value] = inputs[i].split(' ');
    if(steps.has(i)) {
        console.log(`Acc: ${acc}`);
        second = true;
    }
    else {
        steps.add(i);

        if(command === 'nop') {
            i++;
        }
        if(command === 'acc') {
            acc += Number(value);
            i++;
        }
        if(command === 'jmp') {
            i += Number(value);
        }
    }
}