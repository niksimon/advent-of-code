const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const attendees = {};

for(const line of input) {
    const params = line.split(' ');
    const att1 = params[0];
    const att2 = params[params.length - 1].substring(0, params[params.length - 1].length - 1);
    const happiness = params[2] === 'gain' ? +params[3] : -params[3];

    if(attendees[att1] === undefined) attendees[att1] = {};
    if(attendees[att2] === undefined) attendees[att2] = {};

    attendees[att1][att2] = attendees[att1][att2] ? attendees[att1][att2] + happiness : happiness;
    attendees[att2][att1] = attendees[att2][att1] ? attendees[att2][att1] + happiness : happiness;
}

const attendeesCount = Object.keys(attendees).length;
const stack = [{name: 'Alice', happiness: 0, visited: ['Alice']}];
let maxHappiness = 0;

while(stack.length > 0) {
    const current = stack.pop();

    if(current.visited.length === attendeesCount) {
        current.happiness += attendees[current.name][current.visited[0]];
        maxHappiness = Math.max(maxHappiness, current.happiness);
    }

    for(const nextName of Object.keys(attendees[current.name])) {
        if(!current.visited.includes(nextName)) {
            const visited = current.visited.slice();
            visited.push(nextName);
            stack.push({
                name: nextName,
                happiness: current.happiness + attendees[current.name][nextName],
                visited
            });
        }
    }
}

console.log(maxHappiness);