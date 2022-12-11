const fs = require('fs');
const data = fs.readFileSync(`./input.txt`, 'utf-8');

const inputs = data.split("\r\n");

let crates = [];

for(let i = 0, j = 0; i < inputs[0].length; i += 4, j++) {
    crates[j] = [];
    for(let k = 0; !inputs[k].startsWith(" 1"); k++) {
        const crate = inputs[k].substring(i + 1, i + 2);
        if(crate !== " ") {
            crates[j].push(crate);
        }
    }
}

for(let i = inputs.findIndex(x => x === "") + 1; i < inputs.length; i++) {
    const [moveCount, moveFrom, moveTo] = [+inputs[i].split(" ")[1], inputs[i].split(" ")[3] - 1, inputs[i].split(" ")[5] - 1];
    for(let j = moveCount - 1; j >= 0; j--) {
        crates[moveTo].unshift(crates[moveFrom][j]);
        crates[moveFrom].splice(j, 1);
    }
}

let cratesOnTop = "";
for(const c of crates) {
    cratesOnTop += c[0];
}

console.log(cratesOnTop);