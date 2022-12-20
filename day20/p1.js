const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");
const nums = inputs.map(v => +v);
let list = inputs.map((v, i) => ({num: v, id: i}));

for(let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const idx = list.findIndex(x => x.id === i);
    
    list.splice(idx, 1);
    list.splice((n + idx) % list.length, 0, {num: n, id: i});
    //console.log(list.map(x => x.num).join(", "));
}

const idxZero = list.findIndex(x => x.num === 0);

console.log(`Sum: ${list[(1000 + idxZero) % list.length].num + list[(2000 + idxZero) % list.length].num + list[(3000 + idxZero) % list.length].num}`);