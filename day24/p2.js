const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const inputs = data.split("\r\n");

const mapWidth = inputs[0].length;
const mapHeight = inputs.length;

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

const startPos = {x: 1, y: 0};
const endPos = {x: mapWidth - 2, y: mapHeight - 1};
const [t1, t2, t3] = [findExit(startPos, endPos), findExit(endPos, startPos), findExit(startPos, endPos)];
console.log(`1: ${t1}\n2: ${t2}\n3: ${t3}`);
console.log(`Total: ${t1 + t2 + t3}`);

function findExit(start, end) {
    let minutes = 0;
    let player = new Set();
    player.add(`${start.x},${start.y}`);

    moving: while(true) {
        // get every empty spot on map
        const empty = getEmpty(blizzards);
        // make set with every new possible player position
        const nextPlayer = new Set();
    
        for(const p of player) {
            const [x, y] = p.split(",").map(v => +v);
            for(const d in dirs) {
                if(x + dirs[d][0] === end.x && y + dirs[d][1] === end.y) {  
                    break moving;
                }
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

    return minutes;
}

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
    empty.add(`${mapWidth - 2},${mapHeight - 1}`)
    return empty;
}