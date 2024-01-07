const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const gift = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
};

for(let i = 0; i < input.length; i++) {
    const line = input[i];
    const things = line.substring(line.indexOf(":") + 2, line.length)
                        .split(', ').map(e => ({thing: e.split(': ')[0], count: +e.split(': ')[1]}));

    if(things.every(t => 
        ['cats', 'trees'].includes(t.thing) && t.count > gift[t.thing] ||
        ['pomeranians', 'goldfish'].includes(t.thing) && t.count < gift[t.thing] || 
        ['children', 'samoyeds', 'akitas', 'vizslas', 'cars', 'perfumes'].includes(t.thing) && t.count === gift[t.thing]
    )) {
        console.log(i + 1);
    };
}