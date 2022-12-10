const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

let inputs = data.split("\r\n");

let cycle = 1;
let sum = 0;
let x = 1;
let i = 0;
let midOp = false;

while(i < inputs.length) {
    if((cycle - 20) % 40 === 0) {
        sum += cycle * x;
    }

    if(inputs[i].startsWith("addx")) {
        if(midOp) {
            x += +inputs[i].split(" ")[1];
            i++;
        }
        midOp = !midOp;
    }
    else {
        i++;
    }

    cycle++;
}

console.log(sum);