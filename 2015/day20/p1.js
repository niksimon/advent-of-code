const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const presents = input[0] / 10;
console.log(presents);

let num = 500000; // random

while(sumOfDivisors(num) < presents) {
    num++;
}

console.log(num, sumOfDivisors(num));

function sumOfDivisors(n) {
    let sum = 1 + n;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            sum += i;
            if (i !== n / i) {
                sum += n / i;
            }
        }
    }
    return sum;
}
