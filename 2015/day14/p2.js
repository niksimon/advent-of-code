const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const reindeers = [];

for(const line of input) {
    const params = line.split(' ');

    const name = params[0];
    const speed = +params[3];
    const time = +params[6];
    const rest = +params[13];

    reindeers.push({name, speed, time, rest, dist: 0, isResting: false, timeResting: 0, timeTravelling: 0, points: 0});
}

const seconds = 2503;

for(let i = 0; i < seconds; i++) {
    let maxDist = 0;
    for(const reindeer of reindeers) {
        if(reindeer.isResting) {
            reindeer.timeResting++;
            if(reindeer.timeResting === reindeer.rest) {
                reindeer.timeResting = 0;
                reindeer.isResting = false;
            }
        }
        else {
            reindeer.dist += reindeer.speed;
            reindeer.timeTravelling++;
            if(reindeer.timeTravelling === reindeer.time) {
                reindeer.timeTravelling = 0;
                reindeer.isResting = true;
            }
        }
        maxDist = Math.max(maxDist, reindeer.dist);
    }
    reindeers.forEach(r => { if(r.dist === maxDist) r.points++; });
}

console.log(`Max points: ${Math.max(...reindeers.map(r => r.points))}`);