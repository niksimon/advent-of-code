const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let count = 0;
const width = data[0].length;
const height = data.length;

function checkWord(word) {
    return word === 'SAM' || word === 'MAS';
}

for(let i = 1; i < width - 1; i++) {
    for(let j = 1; j < height - 1; j++) {
        const word1 = `${data[i - 1][j - 1]}${data[i][j]}${data[i + 1][j + 1]}`;
        const word2 = `${data[i + 1][j - 1]}${data[i][j]}${data[i - 1][j + 1]}`;
        if(checkWord(word1) && checkWord(word2)) {
            count++;
        }
    }
}

console.log(count);