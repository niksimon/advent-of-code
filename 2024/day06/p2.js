const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = data[0].length;
const height = data.length;

const blocks = new Set();
let steps = new Set();
const DIRS = {
    UP: [0, -1, 'RIGHT', 'UP'], // x, y, next direction
    RIGHT: [1, 0, 'DOWN', 'RIGHT'],
    DOWN: [0, 1, 'LEFT', 'DOWN'],
    LEFT: [-1, 0, 'UP', 'LEFT']
};

class Guard {
    constructor(x = 0, y = 0, dir = DIRS.UP) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
    move() {
        this.x += this.dir[0];
        this.y += this.dir[1];
    }
    turnRight() {
        this.dir = DIRS[this.dir[2]];
    }
};

let guard = new Guard();

for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
        if(data[i][j] === '#') {
            blocks.add(`${j},${i}`);
        }
        if(data[i][j] === '^') {
            guard.x = j;
            guard.y = i;
        }
    }
}

let loopCounts = 0;
const startingPos = {x: guard.x, y: guard.y};
steps.add(`${guard.x},${guard.y}`);

while(guard.x >= 0 && guard.x < width && guard.y >= 0 && guard.y < height) {
    const currentPos = `${guard.x},${guard.y}`;

    while(blocks.has(`${guard.x + guard.dir[0]},${guard.y + guard.dir[1]}`)) {
        guard.turnRight();
    }

    guard.move();

    if(steps.has(currentPos)) continue;

    loopCounts += testLoop(currentPos);
    steps.add(currentPos);
}

console.log(loopCounts);

function testLoop(newBlock) {
    const _steps = new Set();
    const _blocks = new Set(blocks);
    _blocks.add(newBlock);
    const cloneGuard = new Guard(startingPos.x, startingPos.y);
    _steps.add(`${cloneGuard.x},${cloneGuard.y},${cloneGuard.dir[3]}`);

    while(cloneGuard.x >= 0 && cloneGuard.x < width && cloneGuard.y >= 0 && cloneGuard.y < height) {
        while(_blocks.has(`${cloneGuard.x + cloneGuard.dir[0]},${cloneGuard.y + cloneGuard.dir[1]}`)) {
            cloneGuard.turnRight();
        }
    
        cloneGuard.move();

        if(_steps.has(`${cloneGuard.x},${cloneGuard.y},${cloneGuard.dir[3]}`)) {
            return 1;
        }

        _steps.add(`${cloneGuard.x},${cloneGuard.y},${cloneGuard.dir[3]}`);
    }

    return 0;
}