const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const map = new Map();

for(const line of input) {
    let cmd = "";
    let points = {x1: 0, y1: 0, x2: 0, y2: 0};
    let splitAt = 0;

    // where to cut string
    if(line.startsWith("turn on")) {
        cmd = "turn on";
        splitAt = 8;
    }
    else if(line.startsWith("turn off")) {
        cmd = "turn off";
        splitAt = 9;
    }
    else if(line.startsWith("toggle")) {
        cmd = "toggle";
        splitAt = 7;
    }

    // first point, second point
    const lineSplit = [line.substring(splitAt).split(" ")[0], line.substring(splitAt).split(" ")[2]];
    points.x1 = +lineSplit[0].split(',')[0];
    points.y1 = +lineSplit[0].split(',')[1];
    points.x2 = +lineSplit[1].split(',')[0];
    points.y2 = +lineSplit[1].split(',')[1];

    for(let i = points.x1; i <= points.x2; i++) {
        for(let j = points.y1; j <= points.y2; j++) {
            const light = map.get(`${i},${j}`) ?? 0;
            if(cmd === "turn on") {
                map.set(`${i},${j}`, light + 1);
            }
            else if(cmd === "turn off") {
                map.set(`${i},${j}`, Math.max(0, light - 1));
            }
            else if(cmd === "toggle") {
                map.set(`${i},${j}`, light + 2);
            }
        }
    }
}

const totalBrightness = Array.from(map.values()).reduce((a, c) => a + c, 0);

console.log(totalBrightness);