const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const registers = {};
let program = [];

for(const line of data) {
    if(line.startsWith("Register")) {
        const [register, value] = [line.split(": ")[0].slice(-1), BigInt(line.split(": ")[1])];
        registers[register] = value;
    }
    else if(line.startsWith("Program")) {
        program = line.split(": ")[1].split(',').map(e => BigInt(e));
    }
}

function comboOperand(op) {
    if(op >= 4n && op <= 6n) {
        return registers[String.fromCharCode(65 + (Number(op) - 4))];
    }
    return op;
}

const programStr = program.join();
let steps = registers['A'];
// steps = 107089303175168n;
// steps = 107089303175168n;
// steps = 108188814802944n;
// steps = 108257534279680n;
// steps = 109022038458368n;
// steps = 109130486382592n;
// steps = 109130536714240n;
// steps = 109130727555072n;
// steps = 109130729390080n;

// steps = 281474976710655n; // largest A for which there are 16 opcodes 8^16 - 1
// [70368744177664n, 105553116266496n, 140737488355328n, 175921860444160n, 211106232532992n, 246290604621824n] all in between for which the last opcode cycles
// steps = 35184372088832n; // smallest A for which there are 16 opcodes 8^15

// FOUND THAT LAST OPCODES MATCH AT SOMEWHERE BELOW 140737488355328n
// THEN DECREASED STEP BY STEP TO GET ALL EQUAL OPCODES
steps = 136904921295258n; // FOUND THIS SOLUTION THEN DECREASED BY -1 IN LOOP TO FIND THE SMALLEST ONE
steps = 136904920099226n; // FINAL SMALLEST SOLUTION

let output = [];
let doubleSteps = true;

let prevOpcodes = [];

// Opcodes change at steps:
// 1   8   64  512  4096  32768 262144  2097152  16777216  134217728  1073741824  8589934592  68719476736  549755813888  4398046511104  35184372088832
// 8^0 8^1 8^2 8^3  8^4   8^5  8^6      8^7      8^8       8^9        8^10        8^11        8^12         8^13          8^14           8^15

main: while(true) {
    let i = 0n;
    output = [];

    steps--;
    registers['A'] = steps;

    if(steps < 0) break;

    while(Number(i) < program.length) {
        const opcode = program[i];
        const operand = program[i + 1n];
    
        // adv
        if(opcode == 0) {
            registers['A'] = BigInt(registers['A'] / (2n ** comboOperand(operand)));
        }
        // bxl
        else if(opcode == 1) {
            registers['B'] ^= operand;
        }
        // bst
        else if(opcode == 2) {
            registers['B'] = comboOperand(operand) % 8n;
        }
        // jnz
        else if(opcode == 3 && registers['A'] != 0) {
            i = operand;
            continue;
        }
        // bxc
        else if(opcode == 4) {
            registers['B'] ^= registers['C'];
        }
        // out
        else if(opcode == 5) {
            output.push(comboOperand(operand) % 8n);

            // Testing equality backwards one by one opcode from slice(-1) to (-15)
            let fromEnd = 12;
            // if(output.length == program.length && output.slice(-fromEnd).join() == program.slice(-fromEnd).join()) {
            if(output.join() == program.join()) {
                // console.log(prevOpcodes);
                // console.log(steps);
                // doubleSteps = false;
                console.log(steps);
                console.log(output.join());
                // break main;
            }

        }
        // bdv
        else if(opcode == 6) {
            registers['B'] = BigInt(registers['A'] / (2n ** comboOperand(operand)));
        }
        // cdv
        else if(opcode == 7) {
            registers['C'] = BigInt(registers['A'] / (2n ** comboOperand(operand)));
        }
    
        i += 2n;
    }

    // Basically decrease or increase by 8^n steps until we get equal opcodes
    // 1   8   64  512  4096  32768 262144  2097152  16777216  134217728  1073741824  8589934592  68719476736  549755813888  4398046511104  35184372088832
    // steps += 35184372088832n;
    // steps += 4398046511104n;
    // steps += 549755813888n;
    // steps += 68719476736n;
    // steps += 8589934592n;
    // steps += 1073741824n;
    // steps += 134217728n;
    // steps += 16777216n;
    // steps += 2097152n;
    // steps -= 262144n;
    // steps += 32768n;
    // steps += 4096n;
    // steps += 512n;
    // steps += 64n;
    // steps += 8n;
    

    // console.log(steps);
    // console.log(output.join());

}

console.log(steps);
console.log(output.join());