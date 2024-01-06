const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const reindeers = [];

for(const line of input) {
    const params = line.split(' ');

    const name = params[0];
    const speed = +params[3];
    const time = +params[6];
    const rest = +params[13];

    reindeers.push({name, speed, time, rest, dist: 0});
}

const seconds = 2503;
let maxDist = 0;

for(const reindeer of reindeers) {
    const totalTime = reindeer.time + reindeer.rest;
    const d = Math.floor(seconds / totalTime);
    const r = seconds % totalTime;

    const dist = reindeer.speed * reindeer.time * d + Math.min(r, reindeer.time) * reindeer.speed;

    console.log(`Reindeer: ${reindeer.name}, distance: ${dist}`);
    maxDist = Math.max(maxDist, dist);
}

console.log(`Max distance: ${maxDist}`);