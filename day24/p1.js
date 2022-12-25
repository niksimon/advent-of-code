const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const inputs = data.split("\r\n");

const mapWidth = inputs[0].length;
const mapHeight = inputs.length;

let player = new Set();
player.add(`1,0`);
const end = {x: mapWidth - 2, y: mapHeight - 1};

const blizzards = [];
const dirs = {"v": [0,1], ">": [1,0], "^": [0,-1], "<": [-1,0], "o": [0,0]};

for(let i = 0; i < inputs.length; i++) {
    for(let j = 0; j < inputs[i].length; j++) {
        const c = inputs[i][j];
        if(">v<^".includes(c)) {
            blizzards.push({x: j, y: i, dir: dirs[c], icon: c});
        }
    }
}

let minutes = 0;

moving: while(true) {
    // get every empty spot on map
    const empty = getEmpty();
    // make set with every new possible player position
    const nextPlayer = new Set();

    for(const p of player) {
        const [x, y] = p.split(",").map(v => +v);
        if(x === end.x && y === end.y - 1) {
            break moving;
        }
        for(const d in dirs) {
            if(empty.has(`${x + dirs[d][0]},${y + dirs[d][1]}`)) {
                nextPlayer.add(`${x + dirs[d][0]},${y + dirs[d][1]}`);
            }
        }
    }

    blizzards.forEach(b => {
        b.x += b.dir[0];
        b.y += b.dir[1];
        if(b.x === mapWidth - 1) b.x = 1;
        else if(b.x === 0) b.x = mapWidth - 2;
        else if(b.y === mapHeight - 1) b.y = 1;
        else if(b.y === 0) b.y = mapHeight - 2;
    });
    
    player = new Set(nextPlayer);
    minutes++;
}

console.log(minutes);

function getEmpty() {
    const empty = new Set();
    for(let i = 1; i < mapHeight - 1; i++) {
        for(let j = 1; j < mapWidth - 1; j++) {
            const b = blizzards.find(b => b.x === j && b.y === i);
            if(b === undefined) {
                empty.add(`${j},${i}`);
            }
        }
    }
    empty.add(`1,0`);
    return empty;
}