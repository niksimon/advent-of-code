const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = data[0].length;
const height = data.length;
const map = [];
const pos = {x: 0, y: 0};

for(let i = 0; i < height; i++) {
    map[i] = [];
    for(let j = 0; j < width; j++) {
        if(data[i][j] === 'S') {
            pos.x = j;
            pos.y = i;
        }
        map[i].push(data[i][j]);
    }
}

const path = [];
const points = [];
let symbol = 'S';
const startDirs = [[0,1,'-7J','Right'], [0,-1,'-FL',"Left"], [1,0,'|JL',"Down"], [-1,0,'|F7',"Up"]];
const symbolDirs = {'-': [[0,-1], [0,1]], '|': [[1,0], [-1,0]], '7': [[0,-1], [1,0]],
                    'F': [[0,1], [1,0]], 'L': [[-1,0], [0,1]], 'J': [[-1,0], [0,-1]]};

const validDirs = [];
const newPos = {x: pos.x, y: pos.y};

for(const dir of startDirs) {
    const nY = pos.y + dir[0];
    const nX = pos.x + dir[1];
    if(dir[2].includes(map[nY][nX])) {
        validDirs.push(dir[3]);
        newPos.x = nX;
        newPos.y = nY;
    }
}

// if S is turning point add it
if(!(validDirs.includes("Right") && validDirs.includes("Left") || validDirs.includes("Up") && validDirs.includes("Down"))) {
    points.push([pos.y,pos.x]);
}

path.push(`${newPos.y},${newPos.x}`);
symbol = map[newPos.y][newPos.x];

while(symbol !== 'S') {
    for(const dir of symbolDirs[symbol]) {
        const nY = newPos.y + dir[0];
        const nX = newPos.x + dir[1];
        const next = `${nY},${nX}`;

        if(nY >= 0 && nY < height && nX >= 0 && nX < width && !path.includes(next)) {
            const nextSymbol = map[nY][nX];

            if(nextSymbol === 'S' && path.length <= 2) continue;

            if('7LFJ'.includes(nextSymbol)) {
                points.push([nY,nX]);
            }

            path.push(next);
            newPos.x = nX;
            newPos.y = nY;
            symbol = nextSymbol;
            break;
        }
    }
}

let area = 0;

for(let i = 0; i < points.length - 1; i++) {
    area += points[i][1] * points[i + 1][0] - points[i + 1][1] * points[i][0];
}

area += points[0][0] * points[points.length - 1][1] - points[points.length - 1][0] * points[0][1];
area = Math.abs(area) / 2;

console.log(Math.floor(area - path.length / 2 + 1));