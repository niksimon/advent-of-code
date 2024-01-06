const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const ingredients = [];

for(const line of input) {
    const [name, p] = line.split(':');
    const params = p.trim().split(', ').map(e => +e.split(' ')[1]);

    ingredients.push({name, properties: [params[0], params[1], params[2], params[3], params[4]]});
}

const totalSum = 100;
const count = ingredients.length;
let maxScore = 0;
combinations([], 0, 0);
console.log(maxScore);

function combinations(arr, depth, sum) {
    for(let i = depth < count - 1 ? 1 : totalSum - sum; i <= totalSum - sum - (count - 1 - depth); i++) {
        arr[depth] = i;
        if(depth < count - 1) {
            combinations(arr, depth + 1, sum + i);
        }
        else {
            maxScore = Math.max(maxScore, score(arr));
        }
    }
}

function score(arr) {
    let s = 1;
    for(let i = 0; i < 5; i++) {
        let prop = 0;
        for(let j = 0; j < ingredients.length; j++) {
            prop += arr[j] * ingredients[j].properties[i];
        }
        if(i < 4) {
            s *= Math.max(0, prop);
        }
        else if(prop === 500) {
            return s;
        }
    }
    return 0;
}