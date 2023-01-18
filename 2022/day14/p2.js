const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

function dropSand(cave) {
    let falling = true;
    let sand = {x: 500, y: 0};
    while(falling) {
        if(sand.y + 1 === floor) {
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
                    falling = false;
                }
            }
        }
    }
    cave.set(`${sand.x},${sand.y}`, 'o');
}

const cave = new Map();

let floor = 0;

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