const fs = require('fs');
const map = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = map[0].length;
const height = map.length;

const DIRS = {Left: [-1, 0, 'Left'], Right: [1, 0, 'Right'], Up: [0, -1, 'Up'], Down: [0, 1, 'Down']};
const CHANGE_DIRS = {Left: {'/': 'Down', '\\': 'Up', '-': 'Left'}, Right: {'/': 'Up', '\\': 'Down', '-': 'Right'},
                     Up: {'/': 'Right', '\\': 'Left', '|': 'Up'}, Down: {'/': 'Left', '\\': 'Right', '|': 'Down'}};
                
let maxEnergized = 0;

for(let i = 0; i < width; i++) {
    maxEnergized = Math.max(maxEnergized, getEnergized({pos: {x: i, y: 0}, dir: DIRS.Down}));
    maxEnergized = Math.max(maxEnergized, getEnergized({pos: {x: i, y: height - 1}, dir: DIRS.Up}));
    maxEnergized = Math.max(maxEnergized, getEnergized({pos: {x: 0, y: i}, dir: DIRS.Right}));
    maxEnergized = Math.max(maxEnergized, getEnergized({pos: {x: width - 1, y: i}, dir: DIRS.Left}));
}

console.log(maxEnergized);

function getEnergized(start) {
    const energized = new Set();
    const visited = [];
    const beams = [start];

    while(beams.length > 0) {
        const beam = beams.pop();

        if(visited.find(e => e[0] === beam.pos.x && e[1] === beam.pos.y && e[2] === beam.dir[2]) ||
            beam.pos.x < 0 || beam.pos.x >= width || beam.pos.y < 0 || beam.pos.y >= height) {
            continue;
        }

        const tile = map[beam.pos.y][beam.pos.x];
        const nextPositions = [{pos: {x: beam.pos.x + beam.dir[0], y: beam.pos.y + beam.dir[1]}, dir: beam.dir}];
        const nextDir = tile !== '.' ? CHANGE_DIRS[beam.dir[2]][tile] : beam.dir[2];

        if(tile === '/' || tile === '\\') {
            nextPositions[0].pos.x = beam.pos.x + DIRS[nextDir][0];
            nextPositions[0].pos.y = beam.pos.y + DIRS[nextDir][1];
            nextPositions[0].dir = DIRS[nextDir];
        }
        else if(tile === '|' && (beam.dir[2] === 'Right' || beam.dir[2] === 'Left')) {
            nextPositions[0] = {pos: {x: beam.pos.x, y: beam.pos.y - 1}, dir: DIRS.Up};
            nextPositions.push({pos: {x: beam.pos.x, y: beam.pos.y + 1}, dir: DIRS.Down});
        }
        else if(tile === '-' && (beam.dir[2] === 'Up' || beam.dir[2] === 'Down')) {
            nextPositions[0] = {pos: {x: beam.pos.x - 1, y: beam.pos.y}, dir: DIRS.Left};
            nextPositions.push({pos: {x: beam.pos.x + 1, y: beam.pos.y}, dir: DIRS.Right});
        }

        beams.push(...nextPositions);
        visited.push([beam.pos.x, beam.pos.y, beam.dir[2]]);
        energized.add(`${beam.pos.x},${beam.pos.y}`);
    }

    return energized.size;
}