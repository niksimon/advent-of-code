const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const submarine = {x: 0, y: 0, aim: 0};

for(const command of inputs) {
    const [dir, size] = command.split(" ");
    if(dir === "down") {
        submarine.aim += +size;
    }
    else if(dir === "up") {
        submarine.aim -= +size;
    }
    else if(dir === "forward") {
        submarine.x += +size;
        submarine.y += submarine.aim * +size;
    }
}

console.log(submarine.x * submarine.y);