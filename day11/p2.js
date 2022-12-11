const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

const monkeys = [];
for(let i = 0; i < inputs.length; i += 7) {
    const monkey = {
        items: inputs[i + 1].split(":")[1].trim().split(", ").map(v => +v),
        operand: inputs[i + 2].trim().split(" ")[5],
        operation: inputs[i + 2].trim().split(" ")[4],
        divisibleBy: +inputs[i + 3].trim().split(" ")[3],
        divisibleTrue: +inputs[i + 4].trim().split(" ")[5],
        divisibleFalse: +inputs[i + 5].trim().split(" ")[5],
        itemsInspected: 0
    };
    monkeys.push(monkey);
}

// Find Least Common Multiple
let lcm = 0;
const divisors = monkeys.map(x => x.divisibleBy);
const max = Math.max(...divisors);
for(let i = 1; lcm === 0; i++) {
    let divisibleByAll = true;
    for(const d of divisors) {
        if((max * i) % d !== 0) {
            divisibleByAll = false;
            break;
        }
    }
    if(divisibleByAll) {
        lcm = max * i;
    }
}

for(let i = 0; i < 10000; i++) {
    for(const monkey of monkeys) {
        for(const item of monkey.items) {
            const operand = monkey.operand === "old" ? item : +monkey.operand;
            let newItem = monkey.operation === '+' ? item + operand : item * operand;
            newItem = newItem % lcm;
            monkeys[newItem % monkey.divisibleBy > 0 ? monkey.divisibleFalse : monkey.divisibleTrue].items.push(newItem);
        }
        monkey.itemsInspected += monkey.items.length;
        monkey.items = [];
    }
}

for(let j = 0; j < monkeys.length; j++) {
    console.log(`Monkey ${j}: ${monkeys[j].itemsInspected}`);
}

monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);

console.log(`Level of monkey business: ${monkeys[0].itemsInspected * monkeys[1].itemsInspected}`);