const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const Dirs = {R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1]};
const holes = new Set();
let pos = {x: 0, y: 0};
let [maxX, maxY] = [0, 0];
let [minX, minY] = [999999, 999999];
holes.add('0,0');

for(const line of data) {
    const [dir, steps, color] = line.split(' ');

    for(let i = 0; i < steps; i++) {
        pos.x += Dirs[dir][0];
        pos.y += Dirs[dir][1];
        holes.add(`${pos.x},${pos.y}`);
        [maxX, maxY] = [Math.max(maxX, pos.x), Math.max(maxY, pos.y)];
        [minX, minY] = [Math.min(minX, pos.x), Math.min(minY, pos.y)];
    }
}

// get holes on top of the plan, sort the from left to right
let topLine = [...holes].filter(e => +e.split(',')[1] === minY).sort((a, b) => +a.split(',')[0] - +b.split(',')[0]);

// set starting point of search at inside the whole plan, below the second hole on top
const start = {x: +topLine[1].split(',')[0], y: +topLine[1].split(',')[1] + 1};
const visited = new Set();
visited.add(`${start.x},${start.y}`);
const queue = [start];

// BFS
while(queue.length > 0) {
    const item = queue.shift();

    for(const dir of Object.values(Dirs)) {
        let newX = item.x + dir[0];
        let newY = item.y + dir[1];

        if(!visited.has(`${newX},${newY}`) && !holes.has(`${newX},${newY}`)) {
            visited.add(`${newX},${newY}`);
            queue.push({x: newX, y: newY});
        }
    }
}

console.log(holes.size + visited.size);