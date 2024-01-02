const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const map = {};

for(const line of input) {
    const [locations, distance] = line.split(' = ');
    const [loc1, loc2] = locations.split(' to ');

    if(map[loc1] === undefined) map[loc1] = {};
    if(map[loc2] === undefined) map[loc2] = {};

    map[loc1][loc2] = +distance;
    map[loc2][loc1] = +distance;
}

const citiesCount = Object.keys(map).length;
const stack = [...Object.keys(map).map(e => ({city: e, dist: 0, visited: [e]}))];
let maxDist = 0;

while(stack.length > 0) {
    const current = stack.pop();

    if(current.visited.length === citiesCount) {
        maxDist = Math.max(maxDist, current.dist);
    }

    for(const nextCity of Object.keys(map[current.city])) {
        if(!current.visited.includes(nextCity)) {
            const visited = current.visited.slice();
            visited.push(nextCity);
            stack.push({
                city: nextCity,
                dist: current.dist + map[current.city][nextCity],
                visited
            });
        }
    }
}

console.log(maxDist);