const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

function dropSand(cave) {
    let falling = true;
    let sand = {x: 500, y: 0};
    while(falling) {
        if(sand.y + 1 === floor) {
            cave.set(`${sand.x},${sand.y}`, 'o');
            falling = false;
        }
        else {
            if(!cave.has(`${sand.x},${sand.y + 1}`)) {
                sand.y++;
            }
            else {
                if(!cave.has(`${sand.x - 1},${sand.y + 1}`)) {
                    sand.y++;
                    sand.x--;
                }
                else if(!cave.has(`${sand.x + 1},${sand.y + 1}`)) {
                    sand.y++;
                    sand.x++;
                }
                else {
                    cave.set(`${sand.x},${sand.y}`, 'o');
                    falling = false;
                }
            }
        }
    }
}

const cave = new Map();

let floor = 0;

// walls
for(const line of inputs) {
    const path = line.split(" -> ");
    for(let i = 0; i < path.length - 1; i++) {
        let [x1, y1] = path[i].split(",");
        let [x2, y2] = path[i + 1].split(",");
        if(y1 !== y2) {
            for(let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
                cave.set(`${x1},${j}`, '#');
            }
        }
        else {
            for(let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
                cave.set(`${j},${y1}`, '#');
            }
        }
        floor = Math.max(floor, Math.max(y1, y2));
    }
}

floor += 2;
let drops = 0;

// drop sand
while(!cave.has("500,0")) {
    dropSand(cave);
    drops++;
}

console.log(drops);