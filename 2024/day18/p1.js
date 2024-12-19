const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const bytes = new Set(data.slice(0, 1024));
const width = 71;
const height = 71;

const player = {pos: [0, 0], path: new Set()};
const visited = new Set();
player.path.add('0,0');
visited.add('0,0');

const queue = [player];

while(queue.length > 0) {
    const current = queue.shift();

    if(current.pos[0] == width - 1 && current.pos[1] == height - 1) {
        console.log(current.path.size - 1);
        break;
    }

    for(const dir of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        const nextPos = [current.pos[0] + dir[0], current.pos[1] + dir[1]];

        if(nextPos[0] >= 0 && nextPos[0] < width && nextPos[1] >= 0 && nextPos[1] < height && !bytes.has(`${nextPos[0]},${nextPos[1]}`) && !visited.has(`${nextPos[0]},${nextPos[1]}`)) {
            visited.add(`${nextPos[0]},${nextPos[1]}`);
            const newPath = new Set(current.path);
            newPath.add(`${nextPos[0]},${nextPos[1]}`);
            queue.push({pos: nextPos, path: newPath});
        }
    }
}