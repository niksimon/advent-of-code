const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const favoriteNumber = +input[0];
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const walls = new Set();
const visited = new Set();
visited.add('1,1');
const queue = [{pos: [1, 1], steps: 0}];

while(queue.length > 0) {
    const current = queue.shift();

    if(current.steps === 50) {
        continue;
    }

    for(const dir of dirs) {
        const next = [current.pos[0] + dir[0], current.pos[1] + dir[1]];

        if(!walls.has(`${next[0]},${next[1]}`)) {
            const [x, y] = next;
            let num = x*x + 3*x + 2*x*y + y + y*y + favoriteNumber;
            let bin = num.toString(2);
            let countOnes = bin.split('').filter(n => n == 1).length;

            if(countOnes % 2 !== 0) {
                walls.add(`${x},${y}`);
                continue;
            }

            if(next[0] >= 0 && next[1] >= 0 && !visited.has(`${next[0]},${next[1]}`)) {
                queue.push({pos: next, steps: current.steps + 1});
                visited.add(`${next[0]},${next[1]}`);
            }
        }
    }
}

console.log(visited.size);