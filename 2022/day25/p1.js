const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const inputs = data.split("\r\n");

let sum = 0;

for(const line of inputs) {
    sum += snafuToDec(line);
}

console.log(sum);
console.log(decToSnafu(sum));

function snafuToDec(s) {
    const snafuTable = {"=": -2, "-": -1, "0": 0, "1": 1, "2": 2};
    let len = s.length;
    let d = 0;
    for(const c of s) {
        d += snafuTable[c] * Math.pow(5, --len);
    }
    return d;
}

function decToSnafu(dec) {
    const decTable = {0: 0, 1: 1, 2: 2, 3: "=", 4: "-"};
    let snafu = [];
    while(dec > 0) {
        let r = dec % 5;
        snafu.unshift(decTable[r]);
        if(r === 3){
            dec += 2;
        }
        else if(r === 4) {
            dec++;
        }
        dec = Math.floor(dec / 5);
    }
    return snafu.join("");
}