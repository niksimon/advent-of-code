const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = data[0].length;
const height = data.length;

const blocks = new Set();
const steps = new Set();
const DIRS = {
    UP: [0, -1, 'RIGHT'], // x, y, next direction
    RIGHT: [1, 0, 'DOWN'],
    DOWN: [0, 1, 'LEFT'],
    LEFT: [-1, 0, 'UP']
};

const guard = {
    x: null,
    y: null,
    dir: DIRS.UP,
    move() {
        this.x += this.dir[0];
        this.y += this.dir[1];
    },
    turnRight() {
        this.dir = DIRS[this.dir[2]];
    }
};

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

while(guard.x >= 0 && guard.x < width && guard.y >= 0 && guard.y < height) {
    steps.add(`${guard.x},${guard.y}`);

    while(blocks.has(`${guard.x + guard.dir[0]},${guard.y + guard.dir[1]}`)) {
        guard.turnRight();
    }

    guard.move();
}

console.log(steps.size);