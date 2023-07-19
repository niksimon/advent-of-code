const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

for(let i = 0; i < inputs.length; i++) {
    const [command, value] = inputs[i].split(' ');

    if(command === 'acc') {
        continue;
    }

    const newInstructions = inputs.slice();

    newInstructions[i] = (command === 'jmp' ? 'nop' : 'jmp') + ` ${value}`;

    const fixResult = fixCorrupted(newInstructions, i);

    if(fixResult.status) {
        console.log(fixResult.msg);
        break;
    }
}

function fixCorrupted(instructions, step) {
    let acc = 0, second = false, i = 0;
    const steps = new Set();

    while(!second) {
        if(i >= instructions.length) {
            return {msg: `Reached end, fixed op at ${step}, acc ${acc}`, status: true};
        }
        if(i < 0) {
            return {msg: `Index less than 0`, status: false};
        }

        const [command, value] = instructions[i].split(' ');

        if(steps.has(i)) {
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

    return {msg: `Instruction loop at ${step}, acc ${acc}`, status: false};
}