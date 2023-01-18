const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

const leftWall = 0;
const rightWall = 8;
const shapes = [
    {points: [[0,0],[1,0],[2,0],[3,0]], left: [[0,0]], right: [[3,0]], down: [[0,0],[1,0],[2,0],[3,0]], width: 4, height: 1},
    {points: [[0,1],[1,1],[2,1],[1,0],[1,2]], left: [[0,1],[1,0],[1,2]], right: [[1,0],[2,1],[1,2]], down: [[0,1],[1,0],[2,1]], width: 3, height: 3},
    {points: [[0,0],[1,0],[2,0],[2,1],[2,2]], left: [[0,0],[2,1],[2,2]], right: [[2,0],[2,1],[2,2]], down: [[0,0],[1,0],[2,0]], width: 3, height: 3},
    {points: [[0,0],[0,1],[0,2],[0,3]], left: [[0,0],[0,1],[0,2],[0,3]], right: [[0,0],[0,1],[0,2],[0,3]], down: [[0,0]], width: 1, height: 4},
    {points: [[0,0],[0,1],[1,0],[1,1]], left: [[0,0],[0,1]], right: [[1,0],[1,1]], down: [[0,0],[1,0]], width: 2, height: 2},
]
const moves = inputs[0];
const tetris = new Set(["1,0", "2,0", "3,0", "4,0", "5,0", "6,0", "7,0"]);
    let currentShape = 0;
    let currentMove = 0;
    let top = 0;

// only works for this input
// I found at which heights and number of rocks the cycle repeats manually looking through console.log

console.log(dropRocks(285)); // drop 285 rocks, height is 447
console.log(dropRocks(1715)); // after every 1715 rocks dropped, height increases by 2574

let dropRocksTimes = Math.floor((1000000000000 - 285) / 1715);
let leftover = (1000000000000 - 285) % 1715; // remainder at the end
let increaseHeight = 2574 * dropRocksTimes;

console.log(dropRocks(leftover)); // height increased by 2168 at the end

// final result
console.log(447 + increaseHeight + 2168);

function dropRocks(r) {
    let rocks = 0;
    while(rocks < r) {
        const shape = shapes[currentShape % shapes.length];
        const shapePos = [leftWall + 3, top + 4];
    
        falling: while(true) {
            // check right
            let move = 0;
            if(moves[currentMove % moves.length] === '>' && shapePos[0] + shape.width < rightWall) {
                move = 1;
                for(const point of shape.right) {
                    if(tetris.has(`${shapePos[0] + point[0] + 1},${shapePos[1] + point[1]}`)) {
                        move = 0;
                        break;
                    }
                }
            }
            // check left
            else if(moves[currentMove % moves.length] === '<' && shapePos[0] - 1 > leftWall) {
                move = -1;
                for(const point of shape.left) {
                    if(tetris.has(`${shapePos[0] + point[0] - 1},${shapePos[1] + point[1]}`)) {
                        move = 0;
                        break;
                    }
                }
            }
            shapePos[0] += move;
            currentMove++;
    
            // check down
            for(const point of shape.down) {
                if(tetris.has(`${shapePos[0] + point[0]},${shapePos[1] + point[1] - 1}`)) {
                    break falling;
                }
            }
            shapePos[1]--;
        }
    
        for(const point of shape.points) {
            tetris.add(`${shapePos[0] + point[0]},${shapePos[1] + point[1]}`);
        }
        if(shapePos[1] + shape.height - 1 > top) {
            top = shapePos[1] + shape.height - 1;
        }
    
        currentShape++;
        rocks++;

        // 285 rocks dropped to height 447, then 1715 rocks are dropped from height 448 to 3021
        // if(top === 447 || top === 448 || top === 3021 || top === 3040 || top === 5613) {
        //     console.log(`Height: ${top} - Rocks: ${rocks} - Shape: ${currentShape % shapes.length} - Move: ${moves[currentMove % moves.length]}`);
        // }
    }

    return top;
}

// let pastRows = [];
// let currentRows = [];

// for(let i = 0; i <= top; i++) {
//     let row = "";
//     for(let j = 1; j <= 7; j++) {
//         if(tetris.has(`${j},${i}`)) {
//             row += "#";
//         }
//         else {
//             row += ".";
//         }
//     }

//     // at height 448 until 3021 is loop
    
//     pastRows.push(row);
//     currentRows.push(row);
//     if(pastRows.length > 15) {
//         currentRows.shift();
//         for(let k = 0; k <= pastRows.length - 30; k++) {
//             if(currentRows.every((x, i) => currentRows[i] === pastRows[k + i])) {
//                 //console.log(`Found 15 repeating rows at ${i} and ${k}, ${currentRows}`);
//                 break;
//             }
//         }
//     }
//     //console.log(row);
// }
//console.log("-------");
