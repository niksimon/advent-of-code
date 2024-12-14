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

let seconds = 0;
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

let treeSize = 0;
const minTreeSize = Math.floor(robots.length / 10); // Let's say that tree count of robots should have at least 1/10 of total robots

while(treeSize < minTreeSize) {
    seconds++;
    const robotsPos = new Set();

    for(const robot of robots) {
        const newPos = [robot.p[0] + robot.v[0], robot.p[1] + robot.v[1]];
    
        robot.p[0] = ((newPos[0] % width) + width) % width;
        robot.p[1] = ((newPos[1] % height) + height) % height;

        robotsPos.add(`${robot.p[0]},${robot.p[1]}`);
    }

    const visited = new Set();

    // Find every neighbouring robot for each robot
    for(const robot of robots) {
        if(visited.has(`${robot.p[0]},${robot.p[1]}`)) continue;

        visited.add(`${robot.p[0]},${robot.p[1]}`);
        const queue = [{pos: [robot.p[0], robot.p[1]], countRobots: 1}];

        while(queue.length > 0) {
            const current = queue.pop();
            treeSize = Math.max(current.countRobots, treeSize);

            for(const dir of dirs) {
                const newPos = [current.pos[0] + dir[0], current.pos[1] + dir[1]];

                if(newPos[0] >= 0 && newPos[0] < width && newPos[1] >= 0 && newPos[1] < height && !visited.has(`${newPos[0]},${newPos[1]}`) && robotsPos.has(`${newPos[0]},${newPos[1]}`)) {
                    visited.add(`${newPos[0]},${newPos[1]}`);
                    current.pos[0] = newPos[0];
                    current.pos[1] = newPos[1];
                    current.countRobots++;
                    queue.push(current);
                }
            }
        }
    }
}

printMap(robots);
console.log(`Seconds: ${seconds}`);

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