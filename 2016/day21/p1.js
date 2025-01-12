const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

class Password {
    constructor(password) {
        this.password = password.split('');
    }
    getPassword() {
        return this.password.join('');
    }
    swapPositions(p1, p2) {
        const tmp = this.password[p1];
        this.password[p1] = this.password[p2];
        this.password[p2] = tmp;
    }
    swapLetters(l1, l2) {
        const [p1, p2] = [this.password.indexOf(l1), this.password.indexOf(l2)];
        this.swapPositions(p1, p2);
    }
    rotateLeftRight(steps, dir) {
        steps = steps % this.password.length;

        if(steps > 0) {
            const start = dir === "right" ? -steps : steps - this.password.length;
            const end = dir === "right" ? this.password.length - steps : steps;
            this.password = [...this.password.slice(start), ...this.password.slice(0, end)];
        }
    }
    rotateBasedOnPosition(l) {
        const steps = this.password.indexOf(l);
        this.rotateLeftRight(steps + 1 + (steps >= 4 ? 1 : 0), "right");
    }
    reversePositions(p1, p2) {
        while(p1 < p2) {
            const tmp = this.password[p1];
            this.password[p1] = this.password[p2];
            this.password[p2] = tmp;
            p1++;
            p2--;
        }
    }
    movePosition(p1, p2) {
        const removed = this.password.splice(p1, 1);
        this.password.splice(p2, 0, removed[0]);
    }
}

const pass = new Password("abcdefgh");

for(const line of input) {
    const params = line.split(' ');

    if(line.startsWith("swap position")) {
        pass.swapPositions(params[2], params[5]);
    }
    else if(line.startsWith("swap letter")) {
        pass.swapLetters(params[2], params[5]);
    }
    else if(line.startsWith("rotate left") || line.startsWith("rotate right")) {
        pass.rotateLeftRight(params[2], params[1]);
    }
    else if(line.startsWith("rotate based")) {
        pass.rotateBasedOnPosition(params[6]);
    }
    else if(line.startsWith("reverse positions")) {
        pass.reversePositions(params[2], params[4]);
    }
    else if(line.startsWith("move position")) {
        pass.movePosition(params[2], params[5]);
    }
}

console.log(pass.getPassword());