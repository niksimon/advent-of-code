const fs = require('fs');
const memory = fs.readFileSync('./input.txt', 'utf-8');

let sum = 0;

for(let i = 0; i < memory.length - 8; i++) {
    let openingBracketsAt = i + 4;
    if(memory.substring(i, openingBracketsAt) == "mul(") {
        let closingBracketsAt = 0;

        // Find closing ), start from +3 because two digits and one comma between
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

console.log(sum);