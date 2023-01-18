const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

function dropSand(cave, left, right) {
    let falling = true;
    let sand = {x: 500, y: 0};
    while(falling) {
        if(sand.y + 1 <= floor) {
            if(!cave.has(`${sand.x},${sand.y + 1}`)) {
                sand.y++;
            }
            else {
                if(sand.x - 1 < left) {
                    return false;
                }
                else if(!cave.has(`${sand.x - 1},${sand.y + 1}`)) {
                    sand.y++;
                    sand.x--;
                    continue;
                }

                if(sand.x + 1 > right) {
                    return false;
                }
                else if(!cave.has(`${sand.x + 1},${sand.y + 1}`)) {
                    sand.y++;
                    sand.x++;
                    continue;
                }
                cave.set(`${sand.x},${sand.y}`, 'o');
                falling = false;
            }
        }
        else {
            return false;
        }
    }
    return true;
}

const cave = new Map();

let floor = 0;
let left = 9999, right = 0;

// walls
for(const line of inputs) {
    const path = line.split(" -> ");
    for(let i = 0; i < path.length - 1; i++) {
        let [x1, y1] = path[i].split(",");
        let [x2, y2] = path[i + 1].split(",");
        for(let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
            for(let k = Math.min(x1, x2); k <= Math.max(x1, x2); k++) {
                cave.set(`${k},${j}`, '#');
            }
        }
        floor = Math.max(floor, Math.max(y1, y2));
        left = Math.min(left, Math.min(x1, x2));
        right = Math.max(right, Math.max(x1, x2));
    }
}

let drops = 0;

// drop sand
while(dropSand(cave, left, right)) {
    drops++;
}

console.log(drops);