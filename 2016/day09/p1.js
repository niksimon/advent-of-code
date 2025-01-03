const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let result = 0;

for(const line of input) {
    let decompress = '';
    for(let i = 0; i < line.length; i++) {
        const c = line[i];
        
        if(c === '(') {
            let markerEnd = i;
            while(line[markerEnd] !== ')') {
                markerEnd++;
            }

            const marker = line.substring(i + 1, markerEnd);
            const [dist, repeat] = marker.split('x').map(e => +e);

            decompress += line.substring(i + marker.length + 2, i + marker.length + 2 + dist).repeat(repeat);

            i += marker.length + dist + 1;
        }
        else {
            decompress += c;
        }
    }
    result += decompress.length;
}

console.log(result);