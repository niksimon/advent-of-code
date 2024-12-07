const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;

for(const line of data) {
    const [result, nums] = line.split(": ");
    if(dfs(+result, nums.split(' ').map(e => +e))) {
        sum += +result;
    }
}

console.log(sum);

function dfs(result, nums) {
    const queue = [{sum: nums[0], idx: 0}];

    while(queue.length > 0) {
        const current = queue.pop();
        const nextIdx = current.idx + 1;

        const ops = [current.sum + nums[nextIdx], current.sum * nums[nextIdx]];

        if(nextIdx === nums.length - 1 && (ops.some(op => op === result))) {
            return true;
        }

        if(nextIdx < nums.length - 1) {
            ops.forEach(op => {
                if(op <= result) {
                    queue.push({sum: op, idx: nextIdx});
                }
            });
        }
    }

    return false;
}