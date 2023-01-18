const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

const inputs = data.split("\r\n");

const trees = [];
for(let i = 0; i < inputs.length; i++) {
    trees[i] = inputs[i].split("").slice();
}

let maxScenicScore = 0;

for(let i = 1; i < trees.length - 1; i++) {
    for(let j = 1; j < trees[0].length - 1; j++) {
        let current = trees[i][j];
        let top = down = left = right = 0;
        // top
        for(let k = i - 1; k >= 0; k--) {
            top++;
            if(trees[k][j] >= current) {
                break;
            }
        }
        // down
        for(let k = i + 1; k < trees.length; k++) {
            down++;
            if(trees[k][j] >= current) {
                break;
            }
        }
        // left
        for(let k = j - 1; k >= 0; k--) {
            left++;
            if(trees[i][k] >= current) {
                break;
            }
        }
        // right
        for(let k = j + 1; k < trees[0].length; k++) {
            right++;
            if(trees[i][k] >= current) {
                break;
            }
        }
        maxScenicScore = Math.max(maxScenicScore, top * down * left * right);
    }
}

console.log(maxScenicScore);