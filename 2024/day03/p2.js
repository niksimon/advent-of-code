const fs = require('fs');
const memory = fs.readFileSync('./input.txt', 'utf-8');

let sum = 0;
let enabled = true;

for(let i = 0; i < memory.length - 8; i++) {
    if(memory.substring(i, i + 4) == "do()") {
        enabled = true;
        i += 3;
    }
    else if(memory.substring(i, i + 7) == "don't()") {
        enabled = false;
        i += 6;
    }

    if(enabled) {
        let openingBracketsAt = i + 4;
        if(enabled && memory.substring(i, openingBracketsAt) == "mul(") {
            let closingBracketsAt = 0;
    
            // Find closing ), start from +3 because minimum digit, comma, digit
            for(let j = 3; j <= 7; j++) {
                if(memory[openingBracketsAt + j] == ')') {
                    closingBracketsAt = j;
                    break;
                }
            }
    
            if(closingBracketsAt) {
                const nums = memory.substring(openingBracketsAt, openingBracketsAt + closingBracketsAt).split(',');
                if(nums.length === 2 && nums.every(n => Number.isInteger(+n))) {
                    sum += nums[0] * nums[1];
                    i += closingBracketsAt;
                }
            }
    
            i += 3;
        }
    }
}

console.log(sum);