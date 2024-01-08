const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

let molecule = '';
let replacements = [];

for(let i = 0; i < input.length; i++) {
    const line = input[i];

    if(line === '') continue;

    if(i === input.length - 1) {
        molecule = line;
    }
    else {
        const [from, to] = line.split(' => ');
        replacements.push({from, to});
    }
}

let distinctMolecules = new Set();

for(const r of replacements) {
    const rgxp = new RegExp(r.from, "g");
    const replacementsIndices = [...molecule.matchAll(rgxp)].map(a => a.index);

    for(const idx of replacementsIndices) {
        const newMolecule = molecule.substring(0, idx) + r.to + molecule.substring(idx + r.from.length, molecule.length);
        distinctMolecules.add(newMolecule);
    }
}

console.log(distinctMolecules.size);