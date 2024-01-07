const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const total = 150;
const containers = input.map(e => +e).sort((a, b) => b - a);

const queue = containers.map((e, i) => ({arr: [e], idx: i}));
let min = 999999;
let count = 0;

while(queue.length > 0) {
    const item = queue.shift();
    const sum = item.arr.reduce((a, c) => a + c, 0);

    if(sum === total) {
        if(item.arr.length < min) {
            min = item.arr.length;
            count = 1;
        }
        else if(item.arr.length === min) {
            count++;
        }
        continue;
    }

    if(item.idx < containers.length && sum < total) {
        const arr = item.arr.slice();

        if(sum + containers[item.idx + 1] <= total) {
            arr.push(containers[item.idx + 1]);
            queue.push({arr, idx: item.idx + 1});
        }

        queue.push({arr: item.arr.slice(), idx: item.idx + 1});
    }
}

console.log(count);