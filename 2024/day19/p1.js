const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const patterns = data[0].split(', ');
const designs = data.slice(2);
let possibleDesigns = 0;

for(const design of designs) {
    const stack = [];
    const visited = new Set();

    for(const pattern of patterns) {
        if(design.startsWith(pattern)) {
            stack.push({design: pattern, patterns: [pattern]});
            visited.add(pattern);
        }
    }

    main: while(stack.length > 0) {
        const current = stack.pop();
        const designRemainder = design.substring(current.design.length);

        for(const pattern of patterns) {
            if(designRemainder.startsWith(pattern) && !visited.has(current.design + pattern)) {
                if(current.design + pattern === design) {
                    possibleDesigns++;
                    break main;
                }
                stack.push({design: current.design + pattern, patterns: [...current.patterns, pattern]});
                visited.add(current.design + pattern);
            }
        }
    }
}

console.log(possibleDesigns);