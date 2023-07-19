const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const bags = {};

for(const line of inputs) {
    const bag = line.substring(0, line.indexOf("bags") - 1);
    const inside = line.substring(line.indexOf("contain") + 8, line.length).split(',')
                .map(e => {
                    if(e === 'no other bags.') return '';
                    e = e.trim();
                    return e.substring(0, e.indexOf("bag") - 1);
                });
    bags[bag] = inside[0] === '' ? [] : inside;
}

console.log(findNumberOfBagsInside("shiny gold"));

function findNumberOfBagsInside(bag) {
    let n = 0;

    for(const b of bags[bag]) {
        const count = +b.substring(0, b.indexOf(' '));
        const bagName = b.substring(b.indexOf(' ') + 1, b.length);

        n += count + (count * findNumberOfBagsInside(bagName));
    }

    return n;
}
