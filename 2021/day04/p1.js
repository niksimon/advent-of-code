const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const drawnNums = inputs[0].split(",").map(e => +e);
const boards = [];

for(let i = 2, j = 0; i < inputs.length; i += 6, j++) {
    boards[j] = [];
    for(let k = 0; k < 5; k++) {
        boards[j][k] = inputs[i + k].trim().replace(/\s\s/g, " ").split(" ").map(e => ({num: +e, drawn: false}));
    }
}

bingo: for(const drawnNum of drawnNums) {
    let boardNumber = 1;
    for(const board of boards) {
        for(const row of board) {
            for(const item of row) {
                if(item.num === drawnNum) {
                    item.drawn = true;
                }
            }
        }
        if(checkWinner(board)) {
            console.log(`Board ${boardNumber} wins, number called ${drawnNum}`);
            console.log(`Final score: ${getSumOfNotDrawn(board) * drawnNum}`);
            break bingo;
        }
        boardNumber++;
    }
}

function checkWinner(board) {
    // check rows
    for(const row of board) {
        let drawn = 0;
        for(const item of row) {
            if(item.drawn) {
                drawn++;
            }
        }
        if(drawn === 5) return true;
    }

    // check cols
    for(let col = 0; col < 5; col++) {
        let drawn = 0;
        for(let row = 0; row < 5; row++) {
            if(board[row][col].drawn) {
                drawn++;
            }
        }
        if(drawn === 5) return true;
    }

    return false;
}

function getSumOfNotDrawn(board) {
    let sum = 0;
    for(const row of board) {
        for(const item of row) {
            if(!item.drawn) {
                sum += item.num;
            }
        }
    }
    return sum;
}