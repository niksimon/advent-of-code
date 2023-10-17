const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const moves = input[0];
const houses = new Set();
houses.add('0,0');

const santa = {x: 0, y: 0};
const roboSanta = {x: 0, y: 0};
const dirs = {'<': [-1, 0], '>': [1, 0], '^': [0, 1], 'v': [0, -1]};

for(let i = 0; i < moves.length; i++) {
    if(i % 2 === 0) {
        santa.x += dirs[moves[i]][0];
        santa.y += dirs[moves[i]][1];
        houses.add(`${santa.x},${santa.y}`);
    }
    else {
        roboSanta.x += dirs[moves[i]][0];
        roboSanta.y += dirs[moves[i]][1];
        houses.add(`${roboSanta.x},${roboSanta.y}`);
    }
}

console.log(houses.size);