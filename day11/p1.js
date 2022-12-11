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

for(let i = 0; i < 20; i++) {
    for(const monkey of monkeys) {
        for(const item of monkey.items) {
            const operand = monkey.operand === "old" ? item : +monkey.operand;
            let newItem = monkey.operation === '+' ? item + operand : item * operand;
            newItem = Math.floor(newItem / 3);
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