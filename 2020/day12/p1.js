const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const directions = {R: ["E", "S", "W", "N"], L: ["E", "N", "W", "S"]};

const ship = {
    x: 0,
    y: 0,
    dir: "E",
    move(newDir, value) {
        switch(newDir === 'F' ? this.dir : newDir) {
            case "N": this.y += value; break;
            case "S": this.y -= value; break;
            case "E": this.x += value; break;
            case "W": this.x -= value; break;
        }
    },
    turn(newDir, angle) {
        const n = angle / 90;   
        const _dirs = directions[newDir];

        this.dir = _dirs[(_dirs.indexOf(this.dir) + n) % 4];
    }
};

for(const line of inputs) {
    const [action, value] = [line[0], +line.substring(1)];

    if("NSEWF".includes(action)) {
        ship.move(action, value);
    }
    else if(action === 'R' || action === 'L') {
        ship.turn(action, value);
    }

    console.log(ship.x, ship.y, ship.dir);
}

console.log(Math.abs(ship.x) + Math.abs(ship.y));