const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let possible = 0;

for(let i = 0; i < input.length; i += 3) {
    const triangles = [];

    for(let j = 0; j < 3; j++) {
        triangles.push(input[i + j].replace(/\s+/g, ' ').trim().split(' ').map(e => +e));
    }

    for(let j = 0; j < 3; j++) {
        const sides = triangles.map(t => t[j]);

        if(sides[0] + sides[1] > sides[2] && sides[0] + sides[2] > sides[1] && sides[1] + sides[2] > sides[0]) {
            possible++;
        }
    }
}

console.log(possible);