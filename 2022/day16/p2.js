const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const { performance } = require('perf_hooks');

const inputs = data.split("\r\n");

const valves = {};
const tunnels = {};

for(const line of inputs) {
    const valve = line.split(" ")[1];
    const flow = +line.substring(line.indexOf("=") + 1, line.indexOf(";"));

    valves[valve] = flow;

    let idx = line.indexOf("to valve") + 9;
    if(line.indexOf("to valves") !== -1) {
        idx++;
    }

    tunnels[valve] = line.substring(idx).split(", ");
}

// make Map for each valve
const cache = {};
Object.keys(valves).forEach(key => 
    cache[key] = new Map()
);

const startTime = performance.now();

console.log(maxFlow("AA", [], 26, 1));

const endTime = performance.now();

console.log(`Time: ${(endTime - startTime) / 1000} seconds`);

function maxFlow(currentValve, opened, time, elephant) {
    if(time === 0) {
        return elephant === 0 ? 0 : maxFlow("AA", opened, 26, 0);
    }

    const key = `${opened.sort().join('')}${time}${elephant}`;

    if(cache[currentValve].has(key)) {
        return cache[currentValve].get(key);
    }

    let max = 0;

    if(!opened.includes(currentValve) && valves[currentValve] > 0) {
        const currentOpened = [...opened, currentValve];
        const pressure = valves[currentValve] * (time - 1);
        max = Math.max(pressure + maxFlow(currentValve, currentOpened, time - 1, elephant), max);
    }

    for(const valve of tunnels[currentValve]) {
        max = Math.max(maxFlow(valve, opened, time - 1, elephant), max);
    }

    cache[currentValve].set(key, max);
    
    return max;
}