const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const list = data[0].split(' ');
const stones = {};

for(let i = 0; i < list.length; i++) {
    stones[list[i]] = (stones[list[i]] || 0) + 1;
}

for(let i = 0; i < 25; i++) {
    const stonesKeys = Object.keys(stones).filter(key => key != 0 && stones[key] > 0);
    // Keep current stones count
    const stonesCount = {};
    for(const key of stonesKeys) {
        stonesCount[key] = stones[key];
    }
    
    const zeroStones = stones[0] ?? 0;
    stones[0] = 0;

    for(const key of stonesKeys) {
        const count = stonesCount[key];
        if(count > 0) {
            if(`${key}`.length % 2 === 0) {
                const midIdx = `${key}`.length / 2;
                const [leftStone, rightStone] = [+`${key}`.substring(0, midIdx), +`${key}`.substring(midIdx)];
                stones[leftStone] = (stones[leftStone] || 0) + count;
                stones[rightStone] = (stones[rightStone] || 0) + count;
                stones[key] -= count;
            }
            else {
                const newKey = key * 2024;
                stones[key] -= count;
                stones[newKey] = (stones[newKey] || 0) + count;
            }
        }
    }

    // Convert stone 0 to 1
    stones[1] += zeroStones;
}

console.log(Object.values(stones).reduce((a, c) => a + c, 0));