const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const presents = +input[0];
console.log(presents);

let num = 500000; // random

while(sumOfDivisors(num) * 11 < presents) {
    num++;
}

console.log(num);

function sumOfDivisors(n) {
    let sum = n;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            if(i * 50 >= n) {
                sum += i;
            }
            if (i !== n / i && (n / i) * 50 >= n) {
                sum += (n / i);
            }
        }
    }
    return sum;
}
