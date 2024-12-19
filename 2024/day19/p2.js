const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const patterns = data[0].split(', ');
const designs = data.slice(2);
let possibleDesigns = 0;

for(const design of designs) {
    let stack = [{design, count: 1}];
    while(stack.length > 0) {
        const next = {};
        for(const item of stack) {
            if(item.design === "") {
                possibleDesigns += item.count;
                continue;
            }
            for(const pattern of patterns) {
                if(item.design.startsWith(pattern)) {
                    const nextDesign = item.design.substring(pattern.length);
                    next[nextDesign] = ((next[nextDesign]) ?? 0) + item.count;
                }
            }
        }
        stack = Object.keys(next).map(d => ({design: d, count: next[d]}));
    }
}

console.log(possibleDesigns);