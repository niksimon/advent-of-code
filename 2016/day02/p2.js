const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const keypad = [
    "  1  ",
    " 234 ",
    "56789",
    " ABC ",
    "  D  "
];

let pos = [0, 2];
const dirs = {U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0]};
let code = "";

for(const line of input) {
    for(const dir of line) {
        const next = [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]];
        if(next[0] >= 0 && next[0] < 5 && next[1] >= 0 && next[1] < 5 && keypad[next[1]][next[0]] !== ' ') {
            pos = next;
        }
    }
    code += keypad[pos[1]][pos[0]];
}

console.log(code);