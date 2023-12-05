const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const seeds = data[0].split(":")[1].trim().split(" ").map(e => +e);
const maps = [];
let map = {name: "", ranges: []};

for(let i = 2; i < data.length; i++) {
    const line = data[i];

    if(line === '') {
        maps.push(map);
        map = {name: "", ranges: []};
    }
    else if(line.endsWith("map:")) {
        map.name = line.split(" ")[0].split("-")[2];
    }
    else {
        const [destination, source, range] = line.split(" ").map(e => +e);
        map.ranges.push({source, destination, range});
    }
}

let minLocation = Number.MAX_SAFE_INTEGER;

for(const s of seeds) {
    let seed = s;
    for(const category of maps) {
        for(const r of category.ranges) {
            if(seed >= r.source && seed < r.source + r.range) {
                seed = r.destination + seed - r.source;
                break;
            }
        }
    }
    minLocation = Math.min(minLocation, seed);
}

console.log("Lowest location: " + minLocation);