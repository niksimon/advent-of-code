const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

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

const cache = {};

console.log(maxFlow("AA", [], 30));

function maxFlow(currentValve, opened, time) {
    if(time <= 0) {
        return 0;
    }

    const key = [currentValve, ...opened.sort(), time].join();
    if(cache[key]) {
        return cache[key];
    }

    let max = 0;

    if(!opened.includes(currentValve) && valves[currentValve] > 0) {
        const currentOpened = [...opened, currentValve];
        const pressure = valves[currentValve] * (time - 1);
        max = Math.max(pressure + maxFlow(currentValve, currentOpened, time - 1), max);
    }

    for(const valve of tunnels[currentValve]) {
        max = Math.max(maxFlow(valve, opened, time - 1), max);
    }

    cache[key] = max;

    return max;
}