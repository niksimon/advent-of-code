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
        const binaryAddress = address.toString(2).padStart(36, '0');

        const decimalValue = +line.split(' = ')[1];

        let result = "";
        for(let i = 0; i < 36; i++) {
            result += mask[i] === 'X' || mask[i] === '1' ? mask[i] : binaryAddress[i];
        }

        // console.log(`address: ${binaryAddress}  (decimal ${address})`);
        // console.log(`mask:    ${mask}`);
        // console.log(`result:  ${result}`);

        const addresses = getAddresses(result);
        //console.log('addresses:');
        
        // add value to every address in memory
        for(const ad of addresses) {
            memory[ad] = decimalValue;
            //console.log(`${ad}  (decimal ${parseInt(ad, 2)})`);
        }

        //console.log();
    }
}

//console.log(memory);
console.log(Object.values(memory).reduce((a, c) => a + c, 0));

function getAddresses(result) {
    const addresses = [];
    const queue = [result];

    // get every address combination for 0 and 1 replacing X
    while(queue.length > 0) {
        const address = queue.shift();

        // if no more X in address, add it to array
        if(address.split('').filter(c => c === 'X').length === 0) {
            addresses.push(address);
        }
        else {
            const idx = address.indexOf('X');
            queue.push(address.substring(0, idx) + '0' + address.substring(idx + 1, address.length));
            queue.push(address.substring(0, idx) + '1' + address.substring(idx + 1, address.length));
        }
    }

    return addresses;
}