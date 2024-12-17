const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const registers = {};
let program = [];

for(const line of data) {
    if(line.startsWith("Register")) {
        const [register, value] = [line.split(": ")[0].slice(-1), +line.split(": ")[1]];
        registers[register] = value;
    }
    else if(line.startsWith("Program")) {
        program = line.split(": ")[1].split(',').map(e => +e);
    }
}

function comboOperand(op) {
    if(op >= 4 && op <= 6) {
        return registers[String.fromCharCode(65 + (op - 4))];
    }
    return op;
}

let i = 0;
const output = [];

while(i < program.length) {
    const opcode = program[i];
    const operand = program[i + 1];

    // adv
    if(opcode === 0) {
        registers['A'] = Math.floor(registers['A'] / (2 ** comboOperand(operand)));
    }
    // bxl
    else if(opcode === 1) {
        registers['B'] ^= operand;
    }
    // bst
    else if(opcode === 2) {
        registers['B'] = comboOperand(operand) % 8;
    }
    // jnz
    else if(opcode === 3 && registers['A'] !== 0) {
        i = operand;
        continue;
    }
    // bxc
    else if(opcode === 4) {
        registers['B'] ^= registers['C'];
    }
    // out
    else if(opcode === 5) {
        output.push(comboOperand(operand) % 8);
    }
    // bdv
    else if(opcode === 6) {
        registers['B'] = Math.floor(registers['A'] / (2 ** comboOperand(operand)));
    }
    // cdv
    else if(opcode === 7) {
        registers['C'] = Math.floor(registers['A'] / (2 ** comboOperand(operand)));
    }

    i += 2;
}

console.log(output.join());