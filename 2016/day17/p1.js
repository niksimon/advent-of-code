const fs = require('fs');
const md5 = require('js-md5');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const passcode = input[0];
const map = [
    "#########",
    "# | | | #",
    "#-#-#-#-#",
    "# | | | #",
    "#-#-#-#-#",
    "# | | | #",
    "#-#-#-#-#",
    "# | | |  ",
    "####### V"
];

const queue = [{pos: [1, 1], path: ''}];
const dirs = [[0, -1, 'U'], [0, 1, 'D'], [-1, 0, 'L'], [1, 0, 'R']];

while(queue.length > 0) {
    const current = queue.shift();
    const md5Hash = md5(passcode + current.path).substring(0, 4);

    if(current.pos[0] >= 7 && current.pos[1] >= 7) {
        console.log(current);
        break;
    }

    for(let i = 0; i < dirs.length; i++) {
        const next = [current.pos[0] + dirs[i][0], current.pos[1] + dirs[i][1]];
        const next2 = [current.pos[0] + dirs[i][0] * 2, current.pos[1] + dirs[i][1] * 2];

        if(next[0] >= 0 && next[0] < 9 && next[1] >= 0 && next[1] < 9 && map[next[1]][next[0]] !== '#' && (!'-|'.includes(map[next[1]][next[0]]) || "bcdef".includes(md5Hash[i]))) {
            queue.push({pos: next2, path: current.path + dirs[i][2]});
        }
    }
}