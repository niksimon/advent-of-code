const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const inputs = data.split("\r\n");

const map = new Map();
const mapHeight = 200;
const mapWidth = 150;

for(let i = 0; i < mapHeight; i++) {
    for(let j = 0; j < inputs[i].length; j++) {
        const c = inputs[i][j];
        if(c !== " ") {
            map.set(`${j},${i}`, c);
        }
    }
}

const directions = [[1, 0, '>'], [0, 1, 'v'], [-1, 0, '<'], [0, -1, '^']]; // right, down, left, up

const player = {
    icon: ">",
    x: inputs[0].indexOf("."),
    y: 0,
    dir: 0,
    rotate(side) {
        if(side === "R") {
            this.dir = this.dir + 1 > 3 ? 0 : this.dir + 1;
        }
        else {
            this.dir = this.dir - 1 < 0 ? 3 : this.dir - 1;
        }
        this.icon = directions[this.dir][2];
    },
    moveTo(nextPos) {
        this.x = nextPos.x;
        this.y = nextPos.y;
    }
};

let path = [];
let pathItem = "";
for(let i = 0; i <= inputs[inputs.length - 1].length; i++) {
    if(i === inputs[inputs.length - 1].length) {
        path.push(pathItem);
        break;
    }
    let c = inputs[inputs.length - 1][i];
    if(c === "R" || c === "L") {
        path.push(pathItem);
        pathItem = c;
        path.push(pathItem);
        pathItem = "";
    }
    else {
        pathItem += c;
    }
}

map.set(`${player.x},${player.y}`, `${player.icon}`);

for(let i = 0; i < path.length; i++) {
    const p = path[i];
    if(p === "R" || p === "L") {
        //console.log(`Rotating: ${p}`);
        player.rotate(p);
        map.set(`${player.x},${player.y}`, `${player.icon}`);
    }
    else {
        //console.log(`Moving: ${p}`);
        let steps = +p;
        while(steps > 0) {
            const nextPos = {};
            Object.assign(nextPos, getNextPos([player.x, player.y], player.dir));
            if(map.get(`${nextPos.x},${nextPos.y}`) === "#") {
                break;
            }
            else {
                player.moveTo(nextPos);
                map.set(`${player.x},${player.y}`, `${player.icon}`);
                steps--;
            }
        }
    }
    //printMap();
}

console.log(1000 * (player.y + 1) + 4 * (player.x + 1) + player.dir);

function getNextPos(pos) {
    const nextPos = {x: pos[0] + directions[player.dir][0], y: pos[1] + directions[player.dir][1]};
    if(!map.has(`${nextPos.x},${nextPos.y}`)) {
        while(map.has(`${nextPos.x - directions[player.dir][0]},${nextPos.y - directions[player.dir][1]}`)) {
            nextPos.x -= directions[player.dir][0];
            nextPos.y -= directions[player.dir][1];
        }
    }
    return nextPos;
}

function printMap() {
    for(let i = 0; i < mapHeight; i++) {
        let row = "";
        for(let j = 0; j < mapWidth; j++) {
            row += map.has(`${j},${i}`) ? map.get(`${j},${i}`) : " ";
        }
        console.log(row);
    }
}