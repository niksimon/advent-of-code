const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

function findShortestPath(startPos, grid) {
    let queue = [new Position(startPos.top, startPos.left, [], "Start")];

    while (queue.length > 0) {
        const currentPos = queue.shift();
        const directions = ["North", "East", "South", "West"];

        for (const dir in directions) {
            let newPos = exploreNeighbour(currentPos, directions[dir], grid);
            if (newPos.status === "End") {
                return newPos.path;
            } else if (newPos.status === "Valid") {
                queue.push(newPos);
            }
        }
    }

    return false;
}

function exploreNeighbour(currentPos, direction, grid) {
    let newPath = currentPos.path.slice();
    newPath.push(direction);

    let top = currentPos.top;
    let left = currentPos.left;

    switch (direction) {
        case "North":
            top--;
            break;
        case "East":
            left++;
            break;
        case "South":
            top++;
            break;
        case "West":
            left--;
            break;
    }

    let newPos = new Position(top, left, newPath);
    newPos.setStatus(currentPos, newPos, grid);

    if (newPos.status === "Valid") {
        grid[newPos.top][newPos.left].visited = true;
    }

    return newPos;
}

class Position {
    constructor(top, left, path, status = "Unknown") {
        this.top = top;
        this.left = left;
        this.path = path;
        this.status = status;
    }
    setStatus(currentPos, newPos, grid) {
        const [gridWidth, gridHeight] = [grid[0].length, grid.length];
        if (
            newPos.left < 0 ||
            newPos.left >= gridWidth ||
            newPos.top < 0 ||
            newPos.top >= gridHeight
        ) {
            this.status = "Invalid";
        } else if (
            grid[newPos.top][newPos.left].char === 97 && grid[currentPos.top][currentPos.left].char - grid[newPos.top][newPos.left].char === 1
        ) {
            this.status = "End";
        } else if (
            grid[newPos.top][newPos.left].visited || grid[currentPos.top][currentPos.left].char > grid[newPos.top][newPos.left].char + 1
        ) {
            this.status = "Blocked";
        } else {
            this.status = "Valid";
        }
    }
}

class Node {
    constructor(char) {
        this.char = char.charCodeAt();
        this.visited = false;
    }
}

let grid = [];

//let startPoint = {};
let endPoint = {};

for (let i = 0; i < inputs.length; i++) {
    grid[i] = [];
    for (let j = 0; j < inputs[i].length; j++) {
        let char = inputs[i][j];
        if (char === "S") {
            startPoint = { top: i, left: j };
            char = "a";
        } else if (char === "E") {
            endPoint = { top: i, left: j };
            char = "z";
        }
        grid[i][j] = new Node(char);
    }
}

console.log(findShortestPath(endPoint, grid).length);
