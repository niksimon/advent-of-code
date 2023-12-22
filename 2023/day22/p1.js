const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let i = 1;
const bricks = [];
const bricksByLevels = {};

for(const line of data) {
    const [start, end] = line.split('~').map(e => { const [x, y, z] = e.split(',').map(e => +e); return {x, y, z}});
    bricks.push({id: i++, start, end, bricksAbove: new Set(), bricksBelow: new Set()});
}

bricks.sort((a, b) => a.start.z - b.start.z);

for(const brick of bricks) {
    while(!collision(brick, brick.start.z - 1)) {
        brick.start.z--;
        brick.end.z--;
    }
    
    bricksByLevels[brick.end.z] ??= [brick.id];
    bricksByLevels[brick.end.z].push(brick.id);
}

let disintegrate = 0;
for(const brick of bricks) {
    const canDisintegrate = [...brick.bricksAbove].every(b => bricks.find(e => e.id === b).bricksBelow.size > 1);
    if(canDisintegrate) {
        disintegrate++;
    };
}

console.log(disintegrate);

function collision(brick, level) {
    if(level < 1) return true;

    let bricksOnLevel = bricksByLevels[level] ?? [];
    let brickBelow = false;

    if(bricksOnLevel.length > 0) {
        for(const brickOnLevelId of bricksOnLevel) {
            const brickOnLevel = bricks.find(e => e.id === brickOnLevelId);
            if((brick.start.x >= brickOnLevel.start.x && brick.start.x <= brickOnLevel.end.x || brick.end.x >= brickOnLevel.start.x && brick.end.x <= brickOnLevel.end.x
                || brick.start.x <= brickOnLevel.start.x && brick.end.x >= brickOnLevel.end.x) && 
                (brick.start.y >= brickOnLevel.start.y && brick.start.y <= brickOnLevel.end.y || brick.end.y >= brickOnLevel.start.y && brick.end.y <= brickOnLevel.end.y
                || brick.start.y <= brickOnLevel.start.y && brick.end.y >= brickOnLevel.end.y)) {
                // console.log(`Brick ${brickOnLevel.id} is below ${brick.id}`);
                brick.bricksBelow.add(brickOnLevel.id);
                brickOnLevel.bricksAbove.add(brick.id);
                brickBelow = true;
            }
        }
    }

    return brickBelow;
}