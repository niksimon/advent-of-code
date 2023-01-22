const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const oxygenGeneratorRating = getRating("oxygen");
const CO2ScrubberRating = getRating("scrubber");

console.log(binaryToDec(oxygenGeneratorRating) * binaryToDec(CO2ScrubberRating));

function getRating(type) {
    let nums = inputs.slice();
    let i = 0;

    while(nums.length > 1) {
        const tmp = [];
        const bits = getBitsCount(nums);
        for(const num of nums) {
            const cmp = type === "oxygen" ? 
                    bits[i][0] > bits[i][1] ? '0' : '1' :
                    bits[i][1] < bits[i][0] ? '1' : '0';
            if(num[i] === cmp) {
                tmp.push(num);
            }
        }
        i++;
        nums = tmp.slice();
    }

    return nums[0];
}

function getBitsCount(arr) {
    const bits = [];
    for(let i = 0; i < arr[0].length; i++) {
        bits.push([0, 0]);
    }

    for(const n of arr) {
        for(let i = 0; i < n.length; i++) {
            bits[i][n[i]]++;
        }
    }
    return bits;
}

function binaryToDec(bin) {
    let dec = 0;
    for(let i = 0; i < bin.length; i++) {
        dec += bin[i] * Math.pow(2, bin.length - i - 1);
    }
    return dec;
}