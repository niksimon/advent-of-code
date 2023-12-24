const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const hailstones = [];

for(const line of data) {
    const [pos, velocity] = line.split(' @ ');
    const [px, py, pz] = pos.split(', ').map(e => +e);
    const [vx, vy, vz] = velocity.split(', ').map(e => +e);
    hailstones.push({px, py, pz, vx, vy, vz});
}

const min = 200000000000000;
const max = 400000000000000;
let result = 0;

for(let i = 0; i < hailstones.length - 1; i++) {
    for(let j = i + 1; j < hailstones.length; j++) {
        const hs1 = hailstones[i];
        const hs2 = hailstones[j];
        
        let m1 = hs1.vy / hs1.vx;
        let t1 = hs1.py - m1 * hs1.px;

        let m2 = hs2.vy / hs2.vx;
        let t2 = hs2.py - m2 * hs2.px;

        const intersectionX = (t1 - t2) / (m2 - m1);
        const intersectionY = m1 * intersectionX + t1;
        

        if(intersectionX >= min && intersectionX <= max && intersectionY >= min && intersectionY <= max
            && ((hs1.px >= intersectionX && hs1.vx < 0 || hs1.px <= intersectionX && hs1.vx > 0)) && ((hs1.py >= intersectionY && hs1.vy < 0 || hs1.py <= intersectionY && hs1.vy > 0))
            && ((hs2.px >= intersectionX && hs2.vx < 0 || hs2.px <= intersectionX && hs2.vx > 0)) && ((hs2.py >= intersectionY && hs2.vy < 0 || hs2.py <= intersectionY && hs2.vy > 0))
            ) {
            result++;
        }
    }
}

console.log(result);