const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n").map(n => +n);

// main: for(let i = 0; i < inputs.length - 2; i++) {
//     for(let j = i + 1; j < inputs.length - 1; j++) {
//         for(let k = j + 1; k < inputs.length; k++) {
//             if(inputs[i] + inputs[j] + inputs[k] === 2020) {
//                 console.log(inputs[i] * inputs[j] * inputs[k]);
//                 break main;
//             }
//         }
//     }
// }

const map = {};

for(let i = 1; i < inputs.length; i++) {
    if(map[2020 - inputs[i]] !== undefined) {
        const [n1, n2, n3] = [...map[2020 - inputs[i]].split(','), inputs[i]];
        console.log(`${n1} * ${n2} * ${n3} = ${n1 * n2 * n3}`);
    }
    for(let j = 0; j < i; j++) {
        map[inputs[i] + inputs[j]] = `${inputs[i]},${inputs[j]}`;
    }
}