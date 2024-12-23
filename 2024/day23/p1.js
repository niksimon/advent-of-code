const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const connections = {};

data.map(d => d.split('-')).forEach(d => {
    connections[d[0]] ??= [];
    connections[d[1]] ??= [];
    if(!connections[d[0]].includes(d[1])) {
        connections[d[0]].push(d[1]);
    }
    if(!connections[d[1]].includes(d[0])) {
        connections[d[1]].push(d[0]);
    }
});

const setsOfThreeConnected = new Set();
let connectionsWithT = 0;

for(const conn in connections) {
    let connectedTo = connections[conn];
    for(let i = 0; i < connectedTo.length - 1; i++) {
        for(let j = i + 1; j < connectedTo.length; j++) {
            if(connections[connectedTo[i]].includes(connectedTo[j])) {
                const newSet = [conn, connectedTo[i], connectedTo[j]].sort();
                if(!setsOfThreeConnected.has(newSet.join()) && newSet.some(c => c.startsWith('t'))) {
                    connectionsWithT++;
                    setsOfThreeConnected.add(newSet.join());
                }
            }
        }
    }
}

console.log(connectionsWithT);