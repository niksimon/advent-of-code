const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const map = inputs.map(e => e.split('').map(e => +e));
const mapWidth = map[0].length;
const mapHeight = map.length;
const start = {x: 0, y: 0};
const end = {x: mapWidth - 1, y: mapHeight - 1};
const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const queue = {
    items: [],
    enqueue(element) {
        for(let i = 0; i < this.items.length; i++) {
            if (this.items[i].risk > element.risk) {
                this.items.splice(i, 0, element);
                return;
            }
        }
        this.items.push(element);
    },
    dequeue() {
        return this.items.shift();
    }
}
queue.enqueue({pos: [start.x, start.y], risk: 0});

const visited = new Set();
visited.add(`${start.x},${start.y}`);

search: while(queue.items.length > 0) {
    const current = queue.dequeue();

    for(const dir of directions) {
        const nx = current.pos[0] + dir[0];
        const ny = current.pos[1] + dir[1];

        if(nx === end.x && ny === end.y) {
            console.log(current.risk + map[end.y][end.x]);
            break search;
        }

        if(nx >= 0 && nx < mapWidth && ny >= 0 && ny < mapHeight && !visited.has(`${nx},${ny}`)) {       
            const newPos = {
                pos: [nx, ny],
                risk: current.risk + map[ny][nx]
            }
            queue.enqueue(newPos);
            visited.add(`${nx},${ny}`);
        }
    }
}