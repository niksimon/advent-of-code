const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const submarine = {x: 0, y: 0};
const directions = {"forward": [1, 0], "down": [0, 1], "up": [0, -1]};

for(const command of inputs) {
    const [dir, size] = command.split(" ");
    submarine.x += size * directions[dir][0];
    submarine.y += size * directions[dir][1];
}

console.log(submarine.x * submarine.y);