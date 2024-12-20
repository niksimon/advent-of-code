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
let visited = new Set();
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
const steps = Object.keys(stepsTimeToEnd);
visited = new Set();
const times = [];

const manhattanDistance = (x, y, dx, dy) => Math.abs(x - dx) + Math.abs(y - dy);

for(const step of steps.slice(0, steps.length - 1)) {
    const [x, y] = step.split(',').map(e => +e);
    const currentTimeToEnd = stepsTimeToEnd[step];


    // Get all valid next steps in the radius of 20 and the time we need to get to them from the current step and time to get to the end from them
    const validNextSteps = steps.map(s => {
        const [_x, _y] = s.split(',').map(e => +e);
        return {pos: {x: _x, y: _y}, time: manhattanDistance(x, y, _x, _y), timeToEnd: stepsTimeToEnd[`${_x},${_y}`]};
    }).filter(s => !visited.has(`${s.pos.x},${s.pos.y}`) && (s.pos.x !== x || s.pos.y !== y) && s.time <= 20); // Filter out current step and only get those within 20 steps that have less total time than max

    validNextSteps.forEach(s => {
        const timeToEnd = (maxTime - currentTimeToEnd) + s.time + s.timeToEnd;
        if(timeToEnd < maxTime) {
            times.push(timeToEnd);
        }
    });

    visited.add(`${x},${y}`);
}

console.log(times.filter(t => maxTime - t >= 100).length);