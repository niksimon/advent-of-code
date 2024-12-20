const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const walls = new Set();
let start = {};
let end = {};
let maxTime = 1;
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

// Get start, end, max time to walk to end and walls
for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[0].length; j++) {
        if(data[i][j] === 'S') {
            start = {x: j, y: i};
        }
        else if(data[i][j] === 'E') {
            end = {x: j, y: i};
        }
        else if(data[i][j] === '#') {
            walls.add(`${j},${i}`);
        }
        else {
            maxTime++;
        }
    }
}

const stepsTimeToEnd = {};
stepsTimeToEnd[`${start.x},${start.y}`] = maxTime;

let pos = {x: start.x, y: start.y};
const visited = new Set();
visited.add(`${start.x},${start.y}`);
let time = maxTime;

// Get time to get to the end for each step
while(pos.x !== end.x || pos.y !== end.y) {
    for(const dir of dirs) {
        const next = {x: pos.x + dir[0], y: pos.y + dir[1]};
        if(!visited.has(`${next.x},${next.y}`) && !walls.has(`${next.x},${next.y}`)) {
            stepsTimeToEnd[`${next.x},${next.y}`] = --time;
            visited.add(`${next.x},${next.y}`);
            pos.x = next.x;
            pos.y = next.y;
            break;
        }
    }
}

// Start from the beginning again and check every possible wall for shortcuts
const wallsVisited = new Set();
const steps = Object.keys(stepsTimeToEnd);
const times = [];

for(const step of steps.slice(0, steps.length - 1)) {
    const [x, y] = step.split(',').map(e => +e);
    const currentTimeToEnd = stepsTimeToEnd[step];

    for(const dir of dirs) {
        const nextWall = {x: x + dir[0], y: y + dir[1]};
        const nextOverWall = {x: x + dir[0] * 2, y: y + dir[1] * 2};

        // If we haven't visited this wall and it exists and there is a path over the wall
        if(!wallsVisited.has(`${nextWall.x},${nextWall.y}`) && walls.has(`${nextWall.x},${nextWall.y}`) && steps.includes(`${nextOverWall.x},${nextOverWall.y}`)) {
            const nextOverWallTimeToEnd = stepsTimeToEnd[`${nextOverWall.x},${nextOverWall.y}`];
            const timeToEnd = (maxTime - currentTimeToEnd) + 2 + nextOverWallTimeToEnd; // +2 because we go through wall for 2 sec
            times.push(timeToEnd);
            wallsVisited.add(`${nextWall.x},${nextWall.y}`);
        }
    }
}

console.log(times.filter(t => maxTime - t >= 100).length);