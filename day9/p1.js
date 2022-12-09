const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

let inputs = data.split("\r\n");

let visited = new Set();
let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };

for (let line of inputs) {
    let [direction, steps] = line.split(" ");
    for(let j = 0; j < steps; j++) {
        let lastPos = {x: head.x, y: head.y};
        switch (direction) {
            case "R":
                head.x++;
                break;
            case "L":
                head.x--;
                break;
            case "U":
                head.y++;
                break;
            case "D":
                head.y--;
                break;
        }
        if(Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {       
            tail.x = lastPos.x;
            tail.y = lastPos.y;
        }
        visited.add(`${tail.x},${tail.y}`);
    }
}

console.log(visited.size);