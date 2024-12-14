const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let width = 0;
let height = 0;

const robots = data.map(d => {
    const splitLine = d.split(' ');
    const [x, y] = splitLine[0].split('=')[1].split(',').map(e => +e);

    width = Math.max(width, x + 1);
    height = Math.max(height, y + 1);

    return {
        p: [x, y],
        v: splitLine[1].split('=')[1].split(',').map(e => +e)
    }
});

const midX = Math.floor(width / 2);
const midY = Math.floor(height / 2);

const seconds = 100;
const quadrants = [0, 0, 0, 0];

for(const robot of robots) {
    const newPos = [robot.p[0] + robot.v[0] * seconds, robot.p[1] + robot.v[1] * seconds];

    robot.p[0] = ((newPos[0] % width) + width) % width;
    robot.p[1] = ((newPos[1] % height) + height) % height;

    if(robot.p[0] < midX && robot.p[1] < midY) {
        quadrants[0]++;
    }
    else if(robot.p[0] > midX && robot.p[1] < midY) {
        quadrants[1]++;
    }
    else if(robot.p[0] < midX && robot.p[1] > midY) {
        quadrants[2]++;
    }
    else if(robot.p[0] > midX && robot.p[1] > midY) {
        quadrants[3]++;
    }
}

// printMap(robots);

console.log(quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3]);

function printMap(robots) {
    for(let i = 0; i < height; i++) {
        let line = '';
        for(let j = 0; j < width; j++) {
            const count = robots.filter(r => r.p[0] === j && r.p[1] === i).length;
            line += count > 0 ? count : '.';
        }
        console.log(line);
    }
    console.log();
}