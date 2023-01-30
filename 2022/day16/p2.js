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

// need 2 maps because with one we exceed maximum size
const BigMap = {
    cache: [new Map(), new Map()],
    set(key, value) {
        for(const c of this.cache) {
            if(c.size < 16_777_216) {
                c.set(key, value);
                break;
            }
        }
    },
    has(key) {
        return this.cache.some(c => c.has(key));
    },
    get(key) {
        for(const c of this.cache) {
            if(c.has(key)) {
                return c.get(key);
            }
        }
        return undefined;
    }
}

console.log(maxFlow("AA", [], 26, 1));

function maxFlow(currentValve, opened, time, elephant) {
    if(time === 0) {
        return elephant === 0 ? 0 : maxFlow("AA", opened, 26, 0);
    }

    const key = `${currentValve}${opened.sort()}${time}${elephant}`;

    if(BigMap.has(key)) {
        return BigMap.get(key);
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

    BigMap.set(key, max);
    
    return max;
}