const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let count = 0;
const width = data[0].length;
const height = data.length;

function checkWord(word) {
    return word === 'XMAS' || word === 'SAMX';
}

for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
        if(j < width - 3) {
            // Check horizontal to right
            const horizontalWord = `${data[i][j]}${data[i][j + 1]}${data[i][j + 2]}${data[i][j + 3]}`;
            if(checkWord(horizontalWord)) {
                count++;
            }
        }

        if(i < height - 3) {
            // Check vertical to down
            const verticalWord = `${data[i][j]}${data[i + 1][j]}${data[i + 2][j]}${data[i + 3][j]}`;
            if(checkWord(verticalWord)) {
                count++;
            }

            // Check diagonal to down left
            if(j >= 3) {
                const diagonalLeftWord = `${data[i][j]}${data[i + 1][j - 1]}${data[i + 2][j - 2]}${data[i + 3][j - 3]}`;
                if(checkWord(diagonalLeftWord)) {
                    count++;
                }
            }
            // Check diagonal to down right
            if(j < width - 3) {
                const diagonalRightWord = `${data[i][j]}${data[i + 1][j + 1]}${data[i + 2][j + 2]}${data[i + 3][j + 3]}`;
                if(checkWord(diagonalRightWord)) {
                    count++;
                }
            }
        }
    }
}

console.log(count);