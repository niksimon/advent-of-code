const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const screen = [];
const width = 50;
const height = 6;

for(let i = 0; i < height; i++) {
    screen[i] = new Array(width).fill('.');
}

for(const line of input) {
    if(line.startsWith('rect')) {
        const [rectWidth, rectHeight] = line.split(' ')[1].split('x').map(e => +e);
        for(let i = 0; i < rectHeight; i++) {
            for(let j = 0; j < rectWidth; j++) {
                screen[i][j] = '#';
            }
        }
    }
    else {
        const split = line.split(' ');
        const [type, colRow, rotateBy] = [split[1], +split[2].split('=')[1], +split[4]];
        const end = type === 'column' ? height : width;
        const newPos = [];

        for(let i = 0; i < end; i++) {
            if((type === 'column' && screen[i][colRow] === '#') || (type === 'row' && screen[colRow][i] === '#')) {
                const nextPos = (i + rotateBy) % end;
                newPos.push(nextPos);
            }
        }
        for(let i = 0; i < end; i++) {
            if(type === 'column') {
                screen[i][colRow] = newPos.includes(i) ? '#' : '.';
            }
            else {
                screen[colRow][i] = newPos.includes(i) ? '#' : '.';
            }
        }  
    }
}

console.log(screen.reduce((a, c) => a + c.filter(e => e === '#').length, 0));