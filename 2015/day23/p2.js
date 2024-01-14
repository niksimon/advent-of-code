const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const registers = {a: 1, b: 0};

let i = 0;

while(i >= 0 && i < input.length) {
    let line = input[i];
    let instruction = line.substring(0, 3);

    if(instruction === 'hlf') {
        registers[line.substring(4)] = Math.floor(registers[line.substring(4)] / 2);
        i++;
    }
    else if(instruction === 'tpl') {
        registers[line.substring(4)] *= 3;
        i++;
    }
    else if(instruction === 'inc') {
        registers[line.substring(4)]++;
        i++;
    }
    else if(instruction === 'jmp') {
        i += +line.substring(4);
    }
    else if(instruction === 'jie') {
        i += registers[line.substring(4, 5)] % 2 === 0 ? +line.substring(7) : 1;
    }
    else if(instruction === 'jio') {
        i += registers[line.substring(4, 5)] === 1 ? +line.substring(7) : 1;
    }
}

console.log(registers);