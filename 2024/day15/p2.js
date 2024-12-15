const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');

const walls = {};
const boxes = [];
const player = [];
const dataMap = data[0].split('\r\n').map(d => d.replaceAll('#', '##').replaceAll('O', '[]').replaceAll('.', '..').replace('@', '@.'));
const moves = data[1].split('\r\n').join('');
const dirs = {'<': [-1, 0], '>': [1, 0], '^': [0, -1], 'v': [0, 1]};
const width = dataMap[0].length;
const height = dataMap.length;

for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        if(dataMap[i][j] === '@') {
            player[0] = j;
            player[1] = i;
        }
        else if(dataMap[i][j] === '[') {
            boxes.push([[j, i], [j + 1, i]]);
            j++;
        }
        else if(dataMap[i][j] === '#') {
            walls[`${j},${i}`] = '#';
        }
    }
}

function findBox(boxes, pos) {
    return boxes.find(b => b[0][1] === pos[1] && (b[0][0] === pos[0] || b[1][0] === pos[0]));
}

for(const move of moves) {
    const dir = dirs[move];
    const pos = [player[0] + dir[0], player[1] + dir[1]];
    const boxesToMove = [];
    let canMove = false;

    // If its clear, just move player
    if(!walls[`${pos[0]},${pos[1]}`] && !findBox(boxes, pos)) {
        canMove = true;
    }
    // Move left or right
    else if(move === '<' || move === '>') {
        while(!walls[`${pos[0]},${pos[1]}`]) {
            const box = findBox(boxes, pos);
            if(!box) {
                canMove = true;
                break;
            }
            boxesToMove.push(box);
            pos[0] += dir[0] * 2;
        }
    }
    // Move up or down
    else {
        let posAboveBelow = [pos];

        // Search until there are no walls on positions above/below
        while(posAboveBelow.every(p => !walls[`${p[0]},${p[1]}`])) {
            const newPosAboveBelow = [];

            posAboveBelow.forEach(p => {
                const box = findBox(boxes, p);
                // If there is a box on position, add it to boxesToMove(if it isn't already there) and add positions above/below box for checking on next line
                if(box && !findBox(boxesToMove, p)) {
                    boxesToMove.push(box);
                    newPosAboveBelow.push([box[0][0], box[0][1] + dir[1]], [box[1][0], box[1][1] + dir[1]]);
                }
            });

            // If everything is clear on positions then we can move
            if(newPosAboveBelow.length === 0) {
                canMove = true;
                break;
            }

            posAboveBelow = newPosAboveBelow;
        }
    }

    if(canMove) {
        player[0] += dir[0];
        player[1] += dir[1];
        boxesToMove.forEach(b => {
            b[0][0] += dir[0];
            b[1][0] += dir[0];
            b[0][1] += dir[1];
            b[1][1] += dir[1];
        });
    }
}

let result = 0;

boxes.forEach(b => {
    result += b[0][1] * 100 + b[0][0];
});

console.log(result);