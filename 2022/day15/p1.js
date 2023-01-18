const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

const sensors = new Map();
const beacons = new Map();

const visibleRange = [];
const outOfRange = [];
const row = 2000000;

let positions = 0;

for(const line of inputs) {
    const l = line.split(" ").filter(x => "xy".includes(x[0])).map((x, i) => i < 3 ? +x.split("=")[1].slice(0, -1) : +x.split("=")[1]);
    const range = Math.abs(l[0] - l[2]) + Math.abs(l[1] - l[3]);
    sensors.set(`${l[0]},${l[1]}`, range);
    beacons.set(`${l[2]},${l[3]}`, "B");

    const [x, y] = [l[0], l[1]];
    const visibleInRow = Math.max((range - Math.abs(y - row)) * 2 + 1, 0);
    if(visibleInRow > 0) {
        visibleRange.push([x - Math.floor(visibleInRow / 2), x + Math.floor(visibleInRow / 2)]);
    }
    if(y === row) {
        positions--;
    }
}

visibleRange.sort((a, b) => a[0] - b[0]);

positions += Math.max(...visibleRange.map(x => x[1])) - visibleRange[0][0] + 1;
let end = visibleRange[0][1];

for(let i = 1; i < visibleRange.length; i++) {
    if(visibleRange[i][0] > end + 1) {
        outOfRange.push([end, visibleRange[i][0]]);
        positions -= visibleRange[i][0] - end - 1;
    }
    end = Math.max(end, visibleRange[i][1]);
}

for(const b of beacons) {
    if(+b[0].split(",")[1] === row) {
        positions--;
    }
}

console.log(positions);