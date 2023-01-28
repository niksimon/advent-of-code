const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const target = inputs[0].split(": ")[1].split(", ").map(e => e.split("=")[1].split("..").map(e => +e));

const probe = {
    x: 0,
    y: 0,
    velocity: { x: 0, y: 0 },
    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.x -= Math.sign(this.velocity.x);
        this.velocity.y--;
    },
    reset() {
        this.x = 0;
        this.y = 0;
    },
    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }
};

let count = 0;

// brute force
for(let i = target[1][0]; i <= -(target[1][0] + 1); i++) {
    for(let j = 0; j <= target[0][1]; j++) {
        probe.reset();
        probe.setVelocity(j, i);
        while(probe.y >= target[1][0] && probe.x <= target[0][1]) {
            probe.move();
            if(probe.y >= target[1][0] && probe.y <= target[1][1] && probe.x >= target[0][0] && probe.x <= target[0][1]) {
                count++;
                break;
            }
        }
    }
}

console.log(count);