const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const inputs = data.split("\r\n");

const nums = inputs.map(v => +v);
const list = inputs.map((v, i) => ({num: v, id: i}));

for(let i = 0; i < nums.length; i++) {
    const id = list.findIndex(x => x.id === i);
    list.splice(id, 1);
    list.splice((nums[i] + id) % list.length, 0, {num: nums[i], id: i});
}

const idZero = list.findIndex(x => x.num === 0);

console.log(`Sum: ${[1000, 2000, 3000].reduce((prev, curr) => prev + list[(curr + idZero) % list.length].num, 0)}`);