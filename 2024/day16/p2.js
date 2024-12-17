const fs = require('fs');
const { Heap } = require('heap-js');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const walls = new Set();
const end = {x: 0, y: 0};
const dirs = { 
    E: [1, 0, ['S', 'N']], // Keep which dir to go and where we can turn to
    N: [0, -1, ['E', 'W']],
    W: [-1, 0, ['N', 'S']],
    S: [0, 1, ['W', 'E']]
}; 
const reindeer = {
    x: 0,
    y: 0,
    points: 0,
    dir: 'E',
    path: new Set()
}

for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[0].length; j++) {
        if(data[i][j] === '#') {
            walls.add(`${j},${i}`);
        }
        else if(data[i][j] === 'E') {
            end.x = j;
            end.y = i;
        }
        else if(data[i][j] === 'S') {
            reindeer.x = j;
            reindeer.y = i;
            reindeer.path.add(`${j},${i}`);
        }
    }
}

const customPriorityComparator = (a, b) => a.points - b.points;
const heap = new Heap(customPriorityComparator);
heap.push(reindeer);
const visited = new Set();
const bestTiles = new Set();
let lowestScore = 999999999999;

while(heap.length > 0) {
    const r = heap.pop();

    visited.add(`${r.x},${r.y},${r.dir}`);

    for(const dirKey of [r.dir, ...dirs[r.dir][2]]) {
        const dir = [dirs[dirKey][0], dirs[dirKey][1]];
        const nextPos = {x: r.x + dir[0], y: r.y + dir[1]};
        const points = r.points + (r.dir === dirKey ? 1 : 1001);

        if(nextPos.x === end.x && nextPos.y === end.y) {
            if(points <= lowestScore) {
                lowestScore = points;
                r.path.add(`${end.x},${end.y}`);
                for(const p of r.path) {
                    bestTiles.add(p);
                }
            }
            continue;
        }
        
        if(!visited.has(`${nextPos.x},${nextPos.y},${dirKey}`) && !walls.has(`${nextPos.x},${nextPos.y}`) && points < lowestScore) {
            const path = new Set(r.path);
            path.add(`${nextPos.x},${nextPos.y}`);
            heap.push({
                x: nextPos.x,
                y: nextPos.y,
                dir: dirKey,
                points,
                path
            });
        }
    }
}

console.log(bestTiles.size);