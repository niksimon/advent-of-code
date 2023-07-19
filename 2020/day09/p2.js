const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n").map(e => +e);

preamble = 25;
let invalidNum = 0;

// Find invalid number
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
    invalidNum = num;
    break;
}

// Find contiguous range
contiguousRange: for(let i = 0; i < inputs.length - 1; i++) {
    let sum = inputs[i];
    let nums = [inputs[i]];
    for(let j = i + 1; j < inputs.length; j++) {
        sum += inputs[j];
        nums.push(inputs[j]);
        if(sum > invalidNum) {
            break;
        }
        else if(sum === invalidNum) {
            console.log(nums);
            console.log(`Encryption weakness: ${Math.min(...nums) + Math.max(...nums)}`);
            break contiguousRange;
        }
    }
}