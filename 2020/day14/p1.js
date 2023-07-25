const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const memory = {};
let mask = "";

for(const line of inputs) {
    if(line.startsWith("mask")) {
        mask = line.split(' = ')[1];
    }
    else {
        let address = line.split(' = ')[0].split('[')[1];
        address = +address.substring(0, address.length - 1);

        const decimalValue = +line.split(' = ')[1];
        const binaryValue = decimalValue.toString(2).padStart(36, '0');

        let result = "";
        for(let i = 0; i < 36; i++) {
            result += mask[i] === 'X' ? binaryValue[i] : mask[i];
        }

        const decimalResult = parseInt(result, 2);
        memory[address] = decimalResult;

        console.log(`value:  ${binaryValue}  (decimal ${decimalValue})`);
        console.log(`mask:   ${mask}`);
        console.log(`result: ${result}  (decimal ${decimalResult})\n`);
    }
}

console.log("Sum: " + Object.values(memory).reduce((a, c) => a + c, 0));