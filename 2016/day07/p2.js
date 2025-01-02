const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

function getABASequences(str) {
    let arr = [];

    for(let i = 0; i < str.length - 2; i++) {
        if(str[i] === str[i + 2] && str[i] !== str[i + 1]) {
            arr.push(`${str[i]}${str[i + 1]}${str[i + 2]}`);
        }
    }

    return arr;
}

let n = 0;

for(const line of input) {
    let hypernetSequences = [];
    let outsideSequences = [];
    let insideHypernet = false;
    let hypernet = '';
    let outside = '';

    for(let i = 0; i <= line.length; i++) {
        if(i === line.length || line[i] === '[') {
            insideHypernet = true;
            outsideSequences.push(outside);
            outside = '';
        }
        else if(line[i] === ']') {
            insideHypernet = false;
            hypernetSequences.push(hypernet);
            hypernet = '';
        }
        else if(insideHypernet) {
            hypernet += line[i];
        }
        else {
            outside += line[i];
        }
    }

    main: for(const os of outsideSequences) {
        const ABASequences = getABASequences(os);
        for(const aba of ABASequences) {
            const bab = `${aba[1]}${aba[0]}${aba[1]}`;
            if(hypernetSequences.some(s => s.includes(bab))) {
                n++;
                break main;
            }
        }
    }
}

console.log(n);