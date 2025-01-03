const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

function solve(str) {
    let length = 0;
    
    for(let i = 0; i < str.length; i++) {
        const c = str[i];
        if(c === '(') {
            let markerEnd = i;
            while(str[markerEnd] !== ')') {
                markerEnd++;
            }

            const marker = str.substring(i + 1, markerEnd);
            const [dist, repeat] = marker.split('x').map(e => +e);

            length += solve(str.substring(i + marker.length + 2, i + marker.length + 2 + dist)) * repeat;

            i += marker.length + dist + 1;
        }
        else {
            length++;
        }
    }

    return length;
}

let result = 0;

for(const line of input) {
    result += solve(line);
}

console.log(result);