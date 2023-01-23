const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const map = new Map();

for(const line of inputs) {
    const [p1, p2] = line.split(" -> ").map(e => ({x: +e.split(',')[0], y: +e.split(',')[1]}));
    
    while(p1.x !== p2.x || p1.y !== p2.y) {
        if(map.has(`${p1.x},${p1.y}`)) {
            map.set(`${p1.x},${p1.y}`, map.get(`${p1.x},${p1.y}`) + 1);
        }
        else {
            map.set(`${p1.x},${p1.y}`, 1);
        }

        if(p1.x < p2.x) {
            p1.x++;
        }
        else if(p1.x > p2.x) {
            p1.x--;
        }

        if(p1.y < p2.y) {
            p1.y++;
        }
        else if(p1.y > p2.y) {
            p1.y--;
        }
    }

    if(map.has(`${p2.x},${p2.y}`)) {
        map.set(`${p2.x},${p2.y}`, map.get(`${p2.x},${p2.y}`) + 1);
    }
    else {
        map.set(`${p2.x},${p2.y}`, 1);
    }
}

let dangerPoints = 0;

for(let i = 0; i < 1000; i++) {
    for(let j = 0; j < 1000; j++) {
        if(map.has(`${j},${i}`)) {
            if(map.get(`${j},${i}`) >= 2) {
                dangerPoints++;
            }
        }
    }
}

console.log(dangerPoints);