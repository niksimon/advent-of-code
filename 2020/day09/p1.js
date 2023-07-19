const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n").map(e => +e);

preamble = 25;

main: for(let i = preamble; i < inputs.length; i++) {
    const num = inputs[i];
    for(let j = i - preamble; j < i - 1; j++) {
        for(let k = j + 1; k < i; k++) {
            //console.log(`Current num: ${num}, previous nums ${inputs[j]}, ${inputs[k]}`);
            if(num === inputs[j] + inputs[k]) {
                continue main;
            }
        }
    }

    console.log(`Found invalid number: ${num}`);
    break;
}