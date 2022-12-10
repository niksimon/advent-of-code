const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

let inputs = data.split("\r\n");

let cycle = 0;
let x = 1;
let i = 0;
let midOp = false;
let row = "";

while(i < inputs.length) {
    let column = cycle % 40;
    row += x - 1 <= column && column <= x + 1 ? '█' : ' ';

    if(column === 39) {
        console.log(row);
        row = "";
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