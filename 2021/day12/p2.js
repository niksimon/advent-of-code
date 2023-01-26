const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const nodes = {};

for(const line of inputs) {
    const [node1, node2] = line.split('-');

    nodes[node1] = nodes[node1] ? [...nodes[node1], node2] : [node2];
    nodes[node2] = nodes[node2] ? [...nodes[node2], node1] : [node1];
}

let paths = 0;
const stack = [{name: "start", path: ["start"], visited: ["start"], smallVisited: false}];

while(stack.length > 0) {
    const node = stack.pop();
    
    for(const neighbour of nodes[node.name]) {
        let smallVisited = node.smallVisited;

        if(neighbour === "end") {
            //console.log(node.path);
            paths++;
            continue;
        }

        if(neighbour === "start") {
            continue;
        }

        const visited = node.visited.slice();

        if(neighbour === neighbour.toLowerCase()) {
            if(visited.includes(neighbour)) {
                // if we already visited small cave
                if(smallVisited) {
                    continue;
                }
                smallVisited = true;
            }
            visited.push(neighbour);
        }

        const next = {
            name: neighbour,
            path: [...node.path, neighbour],
            visited: visited,
            smallVisited: smallVisited
        };

        stack.push(next);
    }
}

console.log(paths);