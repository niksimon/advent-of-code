const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

const map = [];
const mapWidth = inputs[0].length;
const mapHeight = inputs.length;
const visited = new Set();
const start = {};

for (let i = 0; i < mapHeight; i++) {
    map[i] = [];
    for (let j = 0; j < mapWidth; j++) {
        let char = inputs[i][j];
        if(char === "S") {
            char = "a";
        }
        else if(char === "E") {
            Object.assign(start, {top: i, left: j});
            char = "z";
        }
        map[i][j] = char;
    }
}

console.log(bfs(start, map).length);

function bfs(start, map) {
    const q = [{
        top: start.top,
        left: start.left,
        path: []
    }];
    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];

    while(q.length > 0) {
        const currentPos = q.shift();
        for(const d of directions) {
            const path = currentPos.path.slice();
            let top = currentPos.top;
            let left = currentPos.left;

            top += d[1];
            left += d[0];

            path.push([top, left]);

            if(top >= 0 && top < mapHeight && left >= 0 && left < mapWidth && 
                (map[currentPos.top][currentPos.left].charCodeAt() - map[top][left].charCodeAt() <= 1)) {
                if(map[top][left] === "a") {
                    return path;
                }
                else if(!visited.has(`${top},${left}`)) {
                    q.push({
                        top: top,
                        left: left,
                        path: path
                    });
                    visited.add(`${top},${left}`);
                }
            }
        }
    }

    return false;
}