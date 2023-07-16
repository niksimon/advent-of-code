const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const width = inputs[0].length;
const height = inputs.length;

const result = findTrees(1, 1) * findTrees(3, 1) 
                * findTrees(5, 1) * findTrees(7, 1) * findTrees(1, 2);

console.log(result);

function findTrees(i, j) {
    let trees = 0;
    let x = i, y = j;

    while(y < height) {
        if(inputs[y][x % width] === '#') {
            trees++;
        }
    
        x += i;
        y += j;
    }
    
    console.log(trees);
    return trees;
}