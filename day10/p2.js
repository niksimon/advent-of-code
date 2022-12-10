const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

let cycle = 1, x = 1;
let row = "";

for(const line of inputs) {
    const loops = line.startsWith("addx") ? 2 : 1;

    for(let i = 0; i < loops; i++) {
        const column = (cycle - 1) % 40;
        row += x - 1 <= column && column <= x + 1 ? '█' : ' ';
        if(column === 39) {
            console.log(row);
            row = "";
        }
        cycle++;
    }

    x += loops === 2 ? +line.split(" ")[1] : 0;
}