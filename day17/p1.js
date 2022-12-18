const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

let rocks = 2022;
let top = 0;
const tetris = new Set(["1,0", "2,0", "3,0", "4,0", "5,0", "6,0", "7,0"]);
const leftWall = 0;
const rightWall = 8;
const shapes = [
    {points: [[0,0],[1,0],[2,0],[3,0]], left: [[0,0]], right: [[3,0]], down: [[0,0],[1,0],[2,0],[3,0]], width: 4, height: 1},
    {points: [[0,1],[1,1],[2,1],[1,0],[1,2]], left: [[0,1],[1,0],[1,2]], right: [[1,0],[2,1],[1,2]], down: [[0,1],[1,0],[2,1]], width: 3, height: 3},
    {points: [[0,0],[1,0],[2,0],[2,1],[2,2]], left: [[0,0],[2,1],[2,2]], right: [[2,0],[2,1],[2,2]], down: [[0,0],[1,0],[2,0]], width: 3, height: 3},
    {points: [[0,0],[0,1],[0,2],[0,3]], left: [[0,0],[0,1],[0,2],[0,3]], right: [[0,0],[0,1],[0,2],[0,3]], down: [[0,0]], width: 1, height: 4},
    {points: [[0,0],[0,1],[1,0],[1,1]], left: [[0,0],[0,1]], right: [[1,0],[1,1]], down: [[0,0],[1,0]], width: 2, height: 2},
]
let currentShape = 0;
const moves = inputs[0];
let currentMove = 0;

while(rocks > 0) {
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
    rocks--;
}

// for(let i = top + 3; i > 0; i--) {
//     let row = "|";
//     for(let j = 1; j <= 7; j++) {
//         if(tetris.has(`${j},${i}`)) {
//             row += "#";
//         }
//         else {
//             row += ".";
//         }
//     }
//     console.log(row + "|");
// }
// console.log("+-------+");

console.log(top);