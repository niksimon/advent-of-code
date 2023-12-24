const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const size = data.length;
const dirs = [[1, 0], [-1, 0], [0, -1], [0, 1]];
const start = {x: 1, y: 0};
const end = {x: size - 2, y: size - 1};

// find intersections
const intersections = [{x: start.x, y: start.y}, {x: end.x, y: end.y}];
for(let i = 1; i < size - 1; i++) {
    for(let j = 1; j < size - 1; j++) {
        if(data[i][j] === '#') continue;

        let neighbours = 0;
        for(const dir of dirs) {
            const [nX, nY] = [j + dir[0], i + dir[1]];
            if(nX >= 1 && nX < size - 1 && nY >= 1 && nY < size - 1 && data[nY][nX] !== '#') {
                neighbours++;
            }
        }

        if(neighbours >= 3) {
            intersections.push({x: j, y: i});
        }
    }
}

// get distances between intersections
const intersectionDistances = {};

for(const intersect of intersections) {
    intersectionDistances[`${intersect.x},${intersect.y}`] = {};
    const queue = [{...intersect, len: 0}];
    const visited = [`${intersect.x},${intersect.y}`];

    while(queue.length > 0) {
        const pos = queue.shift();

        for(const dir of dirs) {
            const [nX, nY] = [pos.x + dir[0], pos.y + dir[1]];
            if(!visited.includes(`${nX},${nY}`) && nX >= 0 && nX < size && nY >= 0 && nY < size && data[nY][nX] !== '#') {
                visited.push(`${nX},${nY}`);
                const findIntersection = intersections.find(e => e.x === nX && e.y === nY);
                if(findIntersection) {
                    intersectionDistances[`${intersect.x},${intersect.y}`][`${findIntersection.x},${findIntersection.y}`] = pos.len + 1;
                    continue;
                }
                queue.push({x: nX, y: nY, len: pos.len + 1});
            }
        }
    }
}

// get longest path
const visited = new Set();

function dfs(pos) {
    const [posX, posY] = pos.split(',').map(e => +e);
    if(posX === end.x && posY === end.y) return 0;

    let longestPath = 0;

    visited.add(`${posX},${posY}`);
    
    for(const nextIntersection of Object.keys(intersectionDistances[`${posX},${posY}`])) {
        if(!visited.has(nextIntersection)) {
            longestPath = Math.max(longestPath, dfs(nextIntersection) + intersectionDistances[`${posX},${posY}`][nextIntersection]);
        }
    }

    visited.delete(`${posX},${posY}`);

    return longestPath;
}

console.log(dfs('1,0'));