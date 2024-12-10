const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const trailheadTops = {};
const queue = [];
const width = data[0].length;
const height = data.length;
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
let id = 0;

for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        if(data[i][j] === '0') {
            trailheadTops[id] = 0;
            queue.push({id: id++, x: j, y: i, height: 0});
        }
    }
}

while(queue.length > 0) {
    const trailhead = queue.shift();
    
    for(const dir of dirs) {
        const nextStep = {id: trailhead.id, x: trailhead.x + dir[0], y: trailhead.y + dir[1], height: trailhead.height + 1};

        if(nextStep.x >= 0 && nextStep.x < width && nextStep.y >= 0 && nextStep.y < height && data[nextStep.y][nextStep.x] == nextStep.height) {
            if(nextStep.height == 9) {
                trailheadTops[nextStep.id]++;
            }
            else {
                queue.push(nextStep);
            }
        }
    }
}

console.log(Object.values(trailheadTops).reduce((a, c) => c + a, 0));
