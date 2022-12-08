const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

let inputs = data.split("\r\n");

const trees = [];
for(let i = 0; i < inputs.length; i++) {
    trees[i] = inputs[i].split("").slice();
}

let visible = 2 * inputs[0].length + 2 * (inputs.length - 2);

for(let i = 1; i < trees.length - 1; i++) {
    for(let j = 1; j < trees[0].length - 1; j++) {
        let current = trees[i][j];
        let top = down = left = right = true;
        // top
        for(let k = i - 1; k >= 0; k--) {
            if(trees[k][j] >= current) {
                top = false;
            }
        }
        // down
        for(let k = i + 1; k < trees.length; k++) {
            if(trees[k][j] >= current) {
                down = false;
            }
        }
        // left
        for(let k = j - 1; k >= 0; k--) {
            if(trees[i][k] >= current) {
                left = false;
            }
        }
        // right
        for(let k = j + 1; k < trees[0].length; k++) {
            if(trees[i][k] >= current) {
                right = false;
            }
        }
        if(top || down || left || right) {
            visible++;
        }
    }
}

console.log(visible);