const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

let inputs = data.split("\r\n");

let visited = new Set();
let rope = [];
for(let i = 0; i < 10; i++) {
    rope[i] = {x: 0, y: 0};
}

for (let line of inputs) {
    let [direction, steps] = line.split(" ");
    for(let j = 0; j < steps; j++) {
        switch (direction) {
            case "R":
                rope[0].x++;
                break;
            case "L":
                rope[0].x--;
                break;
            case "U":
                rope[0].y++;
                break;
            case "D":
                rope[0].y--;
                break;
        }
        for(let i = 1; i < 10; i++) {
            let delta = {x: rope[i - 1].x - rope[i].x, y: rope[i - 1].y - rope[i].y};
            let axis = Math.abs(delta.x) > Math.abs(delta.y) ? "x" : "y";
            let axis2 = axis === "x" ? "y" : "x";
            if(Math.abs(delta[axis]) > 1) {
                rope[i][axis] += delta[axis] < 0 ? -1 : 1;
                if(Math.abs(delta[axis2]) > 0) {
                    rope[i][axis2] += delta[axis2] < 0 ? -1 : 1;
                }
            }
        }
        visited.add(`${rope[9].x},${rope[9].y}`);
    }
    
}

console.log(visited.size);