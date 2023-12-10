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
let symbol = 'S';
const startDirs = [[0,1,'-7J'], [0,-1,'-FL'], [1,0,'|JL'], [-1,0,'|F7']];
const symbolDirs = {'-': [[0,-1], [0,1]], '|': [[1,0], [-1,0]], '7': [[0,-1], [1,0]],
                    'F': [[0,1], [1,0]], 'L': [[-1,0], [0,1]], 'J': [[-1,0], [0,-1]]};

for(const dir of startDirs) {
    const nY = pos.y + dir[0];
    const nX = pos.x + dir[1];
    if(dir[2].includes(map[nY][nX])) {
        pos.x = nX;
        pos.y = nY;
        break;
    }
}

path.push(`${pos.y},${pos.x}`);
symbol = map[pos.y][pos.x];

while(symbol !== 'S') {
    for(const dir of symbolDirs[symbol]) {
        const nY = pos.y + dir[0];
        const nX = pos.x + dir[1];
        const next = `${nY},${nX}`;

        if(nY >= 0 && nY < height && nX >= 0 && nX < width && !path.includes(next)) {
            const nextSymbol = map[nY][nX];
            path.push(next);
            pos.x = nX;
            pos.y = nY;
            symbol = nextSymbol;
            break;
        }
    }
}

console.log(path.length / 2);