const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const inputs = data.split("\r\n").map(s => s.split(": "));

const monkeys = new Map();

for(const [name, data] of inputs) {
    monkeys.set(name, data);
}

console.log(calc("root"));

function calc(monkey) {
    const data = monkeys.get(monkey).split(" ");
    if(data.length === 1) {
        return +data;
    }
    switch(data[1]) {
        case "+":
            return calc(data[0]) + calc(data[2]);
        case "-":
            return calc(data[0]) - calc(data[2]);
        case "/":
            return calc(data[0]) / calc(data[2]);
        case "*":
            return calc(data[0]) * calc(data[2]);
    }
    
    // or
    // return eval(`calc(data[0]) ${data[1]} calc(data[2])`);
}