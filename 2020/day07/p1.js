const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const bags = {};

for(const line of inputs) {
    const bag = line.substring(0, line.indexOf("bags") - 1);
    const inside = line.substring(line.indexOf("contain") + 8, line.length).split(',')
                .map(e => {
                    if(e === 'no other bags.') return '';
                    e = e.trim();
                    return e.substring(e.indexOf(' ') + 1, e.indexOf("bag") - 1);
                });
    bags[bag] = inside[0] === '' ? [] : inside;
}

let n = 0;
for(const bag in bags) {
    let shiny = hasShiny(bag);
    console.log(`${bag}: ${shiny}`);
    if(shiny) n++;
}

console.log(n);

function hasShiny(bag) {
    for(const b of bags[bag]) {
        if(b === "shiny gold" || hasShiny(b)) return true;
    }

    return false;
}
