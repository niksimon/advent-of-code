const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

let rocks = 2022;
let top = 0;
const tetris = new Set(["1,0", "2,0", "3,0", "4,0", "5,0", "6,0", "7,0"]);
const leftWall = 0;
const rightWall = 8;
const startLeft = leftWall + 3;
const types = ["-", "+", "L", "|", "."];
let currentType = 0;
const moves = inputs[0];
let currentMove = 0;

while(rocks > 0) {
    const startTop = top + 4;

    // ####
    if(types[currentType % types.length] === "-") {
        let shape = {x: startLeft, y: startTop, width: 4};
        falling: while(true) {
            // check right
            if(moves[currentMove % moves.length] === '>'
                && shape.x + shape.width < rightWall
                && !tetris.has(`${shape.x + shape.width},${shape.y}`)) {
                shape.x++;
            }
            // check left
            else if(moves[currentMove % moves.length] === '<'
                && shape.x - 1 > leftWall
                && !tetris.has(`${shape.x - 1},${shape.y}`)){
                shape.x--;
            }
            currentMove++;
            // check below
            for(let i = shape.x; i < shape.x + shape.width; i++) {
                if(tetris.has(`${i},${shape.y - 1}`)) {
                    break falling;
                }
            }
            shape.y--;
        }
        for(let i = shape.x; i < shape.x + shape.width; i++) {
            tetris.add(`${i},${shape.y}`);
        }
        if(shape.y > top) {
            top = shape.y;
        }
    }

    //  #
    // ###
    //  #
    else if(types[currentType % types.length] === "+") {
        let shape = {x: startLeft, y: startTop, width: 3};
        falling: while(true) {
            // check right
            if(moves[currentMove % moves.length] === '>'
                && shape.x + shape.width < rightWall
                && !tetris.has(`${shape.x + shape.width - 1},${shape.y + 2}`)
                && !tetris.has(`${shape.x + shape.width},${shape.y + 1}`)
                && !tetris.has(`${shape.x + shape.width - 1},${shape.y}`)){
                shape.x++;
            }
            // check left
            else if(moves[currentMove % moves.length] === '<'
                && shape.x - 1 > leftWall
                && !tetris.has(`${shape.x},${shape.y + 2}`)
                && !tetris.has(`${shape.x - 1},${shape.y + 1}`)
                && !tetris.has(`${shape.x},${shape.y}`)){
                shape.x--;
            }
            currentMove++;
            // check below
            if(tetris.has(`${shape.x},${shape.y}`) ||
                tetris.has(`${shape.x + 1},${shape.y - 1}`) ||
                tetris.has(`${shape.x + 2},${shape.y}`)) {
                break falling;
            }
            shape.y--;
        }
        for(let i = shape.x; i < shape.x + shape.width; i++) {
            tetris.add(`${i},${shape.y + 1}`);
        }
        tetris.add(`${shape.x + 1},${shape.y}`);
        tetris.add(`${shape.x + 1},${shape.y + 2}`);
        if(shape.y + 2 > top) {
            top = shape.y + 2;
        }
    }

    //   #
    //   #
    // ###
    else if(types[currentType % types.length] === "L") {
        let shape = {x: startLeft, y: startTop, width: 3};
        falling: while(true) {
            // check right
            if(moves[currentMove % moves.length] === '>'
                && shape.x + shape.width < rightWall
                && !tetris.has(`${shape.x + shape.width},${shape.y + 2}`)
                && !tetris.has(`${shape.x + shape.width},${shape.y + 1}`)
                && !tetris.has(`${shape.x + shape.width},${shape.y}`)){
                shape.x++;
            }
            // check left
            else if(moves[currentMove % moves.length] === '<'
                && shape.x - 1 > leftWall
                && !tetris.has(`${shape.x - 1},${shape.y}`)
                && !tetris.has(`${shape.x},${shape.y + 1}`)
                && !tetris.has(`${shape.x},${shape.y + 2}`)){
                shape.x--;
            }
            currentMove++;
            // check below
            for(let i = shape.x; i < shape.x + shape.width; i++) {
                if(tetris.has(`${i},${shape.y - 1}`)) {
                    break falling;
                }
            }
            shape.y--;
        }
        for(let i = shape.x; i < shape.x + shape.width; i++) {
            tetris.add(`${i},${shape.y}`);
        }
        tetris.add(`${shape.x + 2},${shape.y + 1}`);
        tetris.add(`${shape.x + 2},${shape.y + 2}`);
        if(shape.y + 2 > top) {
            top = shape.y + 2;
        }
    }

    // #
    // #
    // #
    // #
    else if(types[currentType % types.length] === "|") {
        let shape = {x: startLeft, y: startTop, width: 1};
        falling: while(true) {
            // check right
            if(moves[currentMove % moves.length] === '>'
                && shape.x + shape.width < rightWall
                && !tetris.has(`${shape.x + shape.width},${shape.y + 3}`)
                && !tetris.has(`${shape.x + shape.width},${shape.y + 2}`)
                && !tetris.has(`${shape.x + shape.width},${shape.y + 1}`)
                && !tetris.has(`${shape.x + shape.width},${shape.y}`)) {
                shape.x++;
            }
            // check left
            else if(moves[currentMove % moves.length] === '<'
                && shape.x - 1 > leftWall
                && !tetris.has(`${shape.x - 1},${shape.y + 3}`)
                && !tetris.has(`${shape.x - 1},${shape.y + 2}`)
                && !tetris.has(`${shape.x - 1},${shape.y + 1}`)
                && !tetris.has(`${shape.x - 1},${shape.y}`)){
                shape.x--;
            }
            currentMove++;
            // check below
            if(tetris.has(`${shape.x},${shape.y - 1}`)) {
                break falling;
            }
            shape.y--;
        }
        for(let i = shape.y; i < shape.y + 4; i++) {
            tetris.add(`${shape.x},${i}`);
        }
        if(shape.y + 3 > top) {
            top = shape.y + 3;
        }
    }

    // ##
    // ##
    else if(types[currentType % types.length] === ".") {
        let shape = {x: startLeft, y: startTop, width: 2};
        falling: while(true) {
            // check right
            if(moves[currentMove % moves.length] === '>'
                && shape.x + shape.width < rightWall
                && !tetris.has(`${shape.x + shape.width},${shape.y}`)
                && !tetris.has(`${shape.x + shape.width},${shape.y + 1}`)) {
                shape.x++;
            }
            // check left
            else if(moves[currentMove % moves.length] === '<'
                && shape.x - 1 > leftWall
                && !tetris.has(`${shape.x - 1},${shape.y}`)
                && !tetris.has(`${shape.x - 1},${shape.y + 1}`)){
                shape.x--;
            }
            currentMove++;
            // check below
            if(tetris.has(`${shape.x},${shape.y - 1}`) || tetris.has(`${shape.x + 1},${shape.y - 1}`)) {
                break falling;
            }
            shape.y--;
        }
        for(let i = shape.x; i < shape.x + shape.width; i++) {
            tetris.add(`${i},${shape.y}`);
            tetris.add(`${i},${shape.y + 1}`);
        }
        if(shape.y + 1 > top) {
            top = shape.y + 1;
        }
    }

    currentType++;
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