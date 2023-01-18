const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const inputs = data.split("\r\n").map(s => s.split(": "));

const monkeys = new Map();

for(const [name, data] of inputs) {
    monkeys.set(name, data);
}

const root = monkeys.get("root").split(" ");

const left = [findHuman(root[0]), calc(root[0])];
const right = [findHuman(root[2]), calc(root[2])];

if(left[0]) {
    console.log(getNewHumanValue(root[0], right[1]));
}
else {
    console.log(getNewHumanValue(root[2], left[1]));
}

function findHuman(monkey) {
    const data = monkeys.get(monkey).split(" ");
    if(data.length === 1) {
        return false;
    }
    if(data[0] === "humn" || data[2] === "humn") {
        return true;
    }
    return findHuman(data[0]) || findHuman(data[2]);
}

function getNewHumanValue(monkey, value) {
    const data = monkeys.get(monkey).split(" ");
    const m1 = findHuman(data[0]) ? data[0] : data[2];
    const m2 = m1 === data[0] ? data[2] : data[0];

    if(data[0] === "humn") {
        switch(data[1]) {
            case "+":
                return value - calc(data[2]);
            case "-":
                return value + calc(data[2]);
            case "/":
                return value * calc(data[2]);
            case "*":
                return value / calc(data[2]);
        }
    }
    else if(data[2] === "humn") {
        switch(data[1]) {
            case "+":
                return value - calc(data[0]);
            case "-":
                return calc(data[0]) - value;
            case "/":
                return calc(data[0]) / value;
            case "*":
                return value / calc(data[0]);
        }
    }

    if(data[1] === "+") {
        return getNewHumanValue(m1, value - calc(m2));
    }
    else if(data[1] === "*") {
        return getNewHumanValue(m1, value / calc(m2));
    }
    else if(data[1] === "-") {
        if(m1 === data[0]) {
            return getNewHumanValue(data[0], value + calc(data[2]));
        }
        else {
            return getNewHumanValue(data[2], calc(data[0]) - value);
        }
    }
    else if(data[1] === "/") {
        if(m1 === data[0]) {
            return getNewHumanValue(data[0], value * calc(data[2]));
        }
        else {
            return getNewHumanValue(data[2], calc(data[0]) / value);
        }
    }
}

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

