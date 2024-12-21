const fs = require('fs');
const codes = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const keypad = {
    numeric: {
    '7': [0, 0], '8': [1, 0], '9': [2, 0],
    '4': [0, 1], '5': [1, 1], '6': [2, 1],
    '1': [0, 2], '2': [1, 2], '3': [2, 2],
                 '0': [1, 3], 'A': [2, 3],
    },
    directional: {
                 '^': [1, 0], 'A': [2, 0],
    '<': [0, 1], 'v': [1, 1], '>': [2, 1]
    }
};

const dirs = [[0, 1, 'v'], [0, -1, '^'], [1, 0, '>'], [-1, 0, '<']];
let result = 0;

for(const code of codes) {
    let numericRobot = {button: 'A', paths: []};
    let directionalRobot1 = {button: 'A', paths: []};
    let directionalRobot2 = {button: 'A', paths: []};

    for(const c of code) {
        const directionalRobot1Path = findPaths(numericRobot.button, c, 'numeric');
        numericRobot.button = c;
        
        if(directionalRobot1.paths.length === 0) {
            directionalRobot1.paths = directionalRobot1Path;
        }
        else {
            let newPaths = [];
            for(let i = 0; i < directionalRobot1Path.length; i++) {
                for(let j = 0; j < directionalRobot1.paths.length; j++) {
                    newPaths.push(directionalRobot1.paths[j] + directionalRobot1Path[i]);
                }
            }
            directionalRobot1.paths = newPaths;
        }
    }

    let shortestRobot2Path = 999999999;

    for(const dp of directionalRobot1.paths) {
        directionalRobot1.button = 'A';
        let pathsToAdd = [];
        for(const p of dp) {
            const directionalRobot2Path = findPaths(directionalRobot1.button, p, 'directional');
            directionalRobot1.button = p;

            if(pathsToAdd.length === 0) {
                pathsToAdd = directionalRobot2Path;
            }
            else {
                let newPaths = [];
                for(let i = 0; i < directionalRobot2Path.length; i++) {
                    for(let j = 0; j < pathsToAdd.length; j++) {
                        newPaths.push(pathsToAdd[j] + directionalRobot2Path[i]);
                    }
                }
                pathsToAdd = newPaths;
            }
        }
        for(const p of pathsToAdd) {
            shortestRobot2Path = Math.min(shortestRobot2Path, p.length);
        }
        directionalRobot2.paths = directionalRobot2.paths.concat(pathsToAdd);
    }

    // Filter out only those with shortest path
    directionalRobot2.paths = directionalRobot2.paths.filter(p => p.length === shortestRobot2Path);

    let shortestHumanPath = 999999999;

    for(const dp of directionalRobot2.paths) {
        directionalRobot2.button = 'A';
        let pathsToAdd = [];
        for(const p of dp) {
            const humanPath = findPaths(directionalRobot2.button, p, 'directional');
            directionalRobot2.button = p;

            if(pathsToAdd.length === 0) {
                pathsToAdd = humanPath;
            }
            else {
                let newPaths = [];
                for(let i = 0; i < humanPath.length; i++) {
                    for(let j = 0; j < pathsToAdd.length; j++) {
                        newPaths.push(pathsToAdd[j] + humanPath[i]);
                    }
                }
                pathsToAdd = newPaths;
            }
        }

        for(const p of pathsToAdd) {
            shortestHumanPath = Math.min(shortestHumanPath, p.length);
        }
    }

    const complexity = shortestHumanPath * parseInt(code);
    result += complexity;
    console.log(`${shortestHumanPath} * ${parseInt(code)} = ${complexity}`);
}

console.log(result);

function findPaths(from, to, type) {
    const queue = [];
    const visited = new Set();
    const buttons = Object.entries(keypad[type]);
    queue.push({pos: keypad[type][from], path: ""});

    const shortestDist = Math.abs(keypad[type][from][0] - keypad[type][to][0]) + Math.abs(keypad[type][from][1] - keypad[type][to][1]);
    const shortestPaths = [];
    
    while(queue.length > 0) {
        const current = queue.shift();

        if(current.pos[0] === keypad[type][to][0] && current.pos[1] === keypad[type][to][1] && current.path.length === shortestDist) {
            shortestPaths.push(current.path + 'A');
        }

        visited.add(`${current.pos[0]},${current.pos[1]}`);

        for(const dir of dirs) {
            const next = [current.pos[0] + dir[0], current.pos[1] + dir[1]];

            const findNextBtn = buttons.find(b => b[1][0] === next[0] && b[1][1] === next[1]);
            if(findNextBtn && !visited.has(`${next[0]},${next[1]}`)) {
                queue.push({pos: next, path: current.path + dir[2]});
            }
        }
    }

    return shortestPaths;
}