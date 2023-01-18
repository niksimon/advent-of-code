const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const inputs = data.split("\r\n");

const map = new Map();
let mapLeft = 99999, mapRight = 0, mapTop = 0, mapBottom = 99999;

for(let i = 0; i < inputs.length; i++) {
    for(let j = 0; j < inputs[0].length; j++) {
        const c = inputs[i][j];
        if(c === "#") {
            map.set(`${j},${i}`, "");
            mapRight = Math.max(mapRight, j);
            mapLeft = Math.min(mapLeft, j);
            mapTop = Math.max(mapTop, i);
            mapBottom = Math.min(mapBottom, i);
        }
    }
}

let direction = 0;
let rounds = 10;
while(rounds > 0) {
    //printMap();
    const moveTo = {};
    for(const [pos, _] of map) {
        const newPos = findNextPosition(pos);
        if(newPos !== "DontMove") {
            moveTo[newPos] = moveTo[newPos] ? moveTo[newPos] + 1 : 1;
            map.set(pos, newPos);
        }
    }
    for(const [pos, val] of map) {
        const newPos = val !== "" && moveTo[val] === 1 ? val : pos;
        if(newPos === val) {
            const [x, y] = newPos.split(",").map(v => +v);
            map.delete(pos);
            mapRight = Math.max(mapRight, x);
            mapLeft = Math.min(mapLeft, x);
            mapTop = Math.max(mapTop, y);
            mapBottom = Math.min(mapBottom, y);
        }
        map.set(newPos, "");
    }
    direction = direction === 3 ? 0 : direction + 1;
    rounds--;
}

console.log(printMap());

function findNextPosition(pos) {
    const [x, y] = pos.split(",").map(v => +v);
    const edges = [
        [[-1,-1],[0,-1],[1,-1]],
        [[-1,1],[0,1],[1,1]],
        [[-1,-1],[-1,0],[-1,1]],
        [[1,-1],[1,0],[1,1]]
    ];
    const newPos = [];

    for(let i = direction; i < direction + 4; i++) {
        const [e1, e2, e3] = edges[i % 4].slice();
        if(!map.has(`${x+e1[0]},${y+e1[1]}`) && !map.has(`${x+e2[0]},${y+e2[1]}`) && !map.has(`${x+e3[0]},${y+e3[1]}`)) {
            newPos.push(`${x+e2[0]},${y+e2[1]}`);
        }
    }

    return newPos.length > 0 && newPos.length < 4 ? newPos[0] : "DontMove";
}

function printMap() {
    let empty = 0;
    for(let i = mapBottom; i <= mapTop; i++) {
        let row = "";
        for(let j = mapLeft; j <= mapRight; j++) {
            if(map.has(`${j},${i}`)) {
                row += "#";
            }
            else {
                row += ".";
                empty++;
            }
        }
        console.log(row);
    }
    console.log(`\n---------------\n`);
    return empty;
}