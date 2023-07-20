const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n").map(e => +e);

inputs.sort((a, b) => a - b);
inputs.unshift(0);
inputs.push(inputs[inputs.length - 1] + 3);

const paths = {};

// Set number of paths to 1 for last 3 adapters, because that's the max number they can have
paths[inputs[inputs.length - 1]] = 1;
paths[inputs[inputs.length - 2]] = 1;
paths[inputs[inputs.length - 3]] = 1;

// Loop backwards
for(let i = inputs.length - 3; i >= 0; i--) {
    let currentPaths = 0;

    // Check next 3 bigger adapters
    for(let j = 1; j <= 3; j++) {
        if(inputs[i + j] - inputs[i] <= 3) {
            // if it's in range of 1,2,3 jolts, add number of paths of that adapter to current one
            currentPaths += paths[inputs[i + j]];
        }
    }

    paths[inputs[i]] = currentPaths;
}

console.log(paths);
console.log(paths[0]); // final result