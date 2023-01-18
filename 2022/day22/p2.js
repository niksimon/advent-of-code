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
    rotate(side, times = 1) {
        while(times > 0) {
            if(side === "R") {
                this.dir = this.dir + 1 > 3 ? 0 : this.dir + 1;
            }
            else {
                this.dir = this.dir - 1 < 0 ? 3 : this.dir - 1;
            }
            this.icon = directions[this.dir][2];
            times--;
        }
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
                if(nextPos.rotations.length > 0) {
                    player.rotate(nextPos.rotations[0] === "R" ? "L" : "R", nextPos.rotations[1]);
                }
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

//printMap();

console.log(1000 * (player.y + 1) + 4 * (player.x + 1) + player.dir);

function getNextPos(pos) {
    const nextPos = {x: pos[0] + directions[player.dir][0], y: pos[1] + directions[player.dir][1], rotations: []};
    if(!map.has(`${nextPos.x},${nextPos.y}`)) {
        // top
        if(nextPos.y < 0) {
            // left
            if(nextPos.x < 100) {
                nextPos.y = 150 + (nextPos.x - 50);
                nextPos.x = 0;
                player.rotate("R");
                nextPos.rotations.push("R", 1);
            }
            // right
            else {
                nextPos.x -= 100;
                nextPos.y = 199;
            }
        }
        // down
        else if(nextPos.y > 199) {
            nextPos.x += 100;
            nextPos.y = 0;
        }
        // left
        else if(nextPos.x < 0) {
            // top
            if(nextPos.y < 150) {
                nextPos.y = 149 - nextPos.y;
                nextPos.x = 50;
                player.rotate("R", 2);
                nextPos.rotations.push("R", 2);
            }
            // down
            else {
                nextPos.x = 50 + (nextPos.y - 150);
                nextPos.y = 0;
                player.rotate("L");
                nextPos.rotations.push("L", 1);
            }
        }
        // right
        else if(nextPos.x > 149) {
            nextPos.x = 99;
            nextPos.y = 149 - nextPos.y;
            player.rotate("R", 2);
            nextPos.rotations.push("R", 2);
        }
        // mid left and mid top
        else if(nextPos.x < 50 && nextPos.y < 100) {
            if(player.dir === 2) {
                // top
                if(nextPos.y < 50) {
                    nextPos.x = 0;
                    nextPos.y = 149 - nextPos.y;
                    player.rotate("R", 2);
                    nextPos.rotations.push("R", 2);
                }
                // down
                else {
                    nextPos.x = nextPos.y - 50;
                    nextPos.y = 100;
                    player.rotate("L");
                    nextPos.rotations.push("L", 1);
                }
            }
            else if(player.dir === 3) {
                nextPos.y = 50 + nextPos.x;
                nextPos.x = 50;
                player.rotate("R");
                nextPos.rotations.push("R", 1);
            }
        }
        // mid right and right down
        else if(nextPos.x > 99 && nextPos.y > 49) {
            if(player.dir === 0) {
                // top
                if(nextPos.y < 100) {
                    nextPos.x = 100 + (nextPos.y - 50);
                    nextPos.y = 49;
                    player.rotate("L");
                    nextPos.rotations.push("L", 1);
                }
                // down
                else {
                    nextPos.x = 149;
                    nextPos.y = 149 - nextPos.y;
                    player.rotate("R", 2);
                    nextPos.rotations.push("R", 2);
                }
            }
            else if(player.dir === 1) {
                nextPos.y = 50 + (nextPos.x - 100);
                nextPos.x = 99;
                player.rotate("R");
                nextPos.rotations.push("R", 1);
            }
        }
        // mid down and down right
        else if(nextPos.x > 49 && nextPos.y > 149) {
            if(player.dir === 1) {
                nextPos.y = 150 + (nextPos.x - 50);
                nextPos.x = 49;
                player.rotate("R");
                nextPos.rotations.push("R", 1);
            }
            else if(player.dir === 0) {
                nextPos.x = 50 + (nextPos.y - 150);
                nextPos.y = 149;
                player.rotate("L");
                nextPos.rotations.push("L", 1);
            }
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