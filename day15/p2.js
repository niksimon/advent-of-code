const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

const sensors = new Map();
const beacons = new Map();

for(const line of inputs) {
    const l = line.split(" ").filter(x => "xy".includes(x[0])).map((x, i) => i < 3 ? +x.split("=")[1].slice(0, -1) : +x.split("=")[1]);
    const range = Math.abs(l[0] - l[2]) + Math.abs(l[1] - l[3]);
    sensors.set(`${l[0]},${l[1]}`, range);
    beacons.set(`${l[2]},${l[3]}`, "B");
}

let row = 0;
while(!f(row)) {
    row++;
}

function f(row) {
    const visibleRange = [];
    const outOfRange = [];

    for(const s of sensors) {
        const [x, y] = s[0].split(",").map(v => +v);
        const range = s[1];
        const visibleInRow = Math.max((range - Math.abs(y - row)) * 2 + 1, 0);
        if(visibleInRow > 0) {
            visibleRange.push([x - Math.floor(visibleInRow / 2), x + Math.floor(visibleInRow / 2)]);
        }
    }

    visibleRange.sort((a, b) => a[0] - b[0]);
    let end = visibleRange[0][1];

    for(let i = 1; i < visibleRange.length; i++) {
        if(visibleRange[i][0] > end + 1) {
            outOfRange.push([end, visibleRange[i][0]]);
        }
        end = Math.max(end, visibleRange[i][1]);
    }

    if(outOfRange.length > 0) {
        console.log((outOfRange[0][0] + 1) * 4000000 + row);
        return true;
    }

    return false;
}