const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const nodes = {};

for(const line of inputs) {
    const [node1, node2] = line.split('-');

    nodes[node1] = nodes[node1] ? [...nodes[node1], node2] : [node2];
    nodes[node2] = nodes[node2] ? [...nodes[node2], node1] : [node1];
}

let paths = 0;
const stack = [{name: "start", path: ["start"], visited: new Set()}];
stack[0].visited.add("start");

while(stack.length > 0) {
    const node = stack.pop();
    
    for(const neighbour of nodes[node.name]) {
        if(neighbour === "end") {
            //console.log(node.path);
            paths++;
            continue;
        }

        if(!node.visited.has(neighbour)) {
            const visited = new Set(node.visited);
            
            if(neighbour === neighbour.toLowerCase()) {
                visited.add(neighbour);
            }

            const next = {
                name: neighbour,
                path: [...node.path, neighbour],
                visited: visited
            };

            stack.push(next);
        }
    }
}

console.log(paths);