const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const ship = {
    x: 0,
    y: 0,
    move(value) {
        this.x += waypoint.x * value;
        this.y += waypoint.y * value;
    },
};

const waypoint = {
    x: 10,
    y: 1,
    move(dir, value) {
        switch(dir) {
            case "N": this.y += value; break;
            case "S": this.y -= value; break;
            case "E": this.x += value; break;
            case "W": this.x -= value; break;
        }
    },
    turn(dir, angle) {
        if(angle === 180) {
            this.x = -this.x;
            this.y = -this.y;
        }
        else if(dir === 'R' && angle === 90 || dir === 'L' && angle === 270) {
            const tmp = this.x;
            this.x = this.y;
            this.y = -tmp;
        }
        else if(dir === 'R' && angle === 270 || dir === 'L' && angle === 90) {
            const tmp = this.x;
            this.x = -this.y;
            this.y = tmp;
        }
    }
};

for(const line of inputs) {
    const [action, value] = [line[0], +line.substring(1)];

    if(action === 'F') {
        ship.move(value);
    }
    else if("NSEW".includes(action)) {
        waypoint.move(action, value);
    }
    else if(action === 'R' || action === 'L') {
        waypoint.turn(action, value);
    }

    console.log(ship.x, ship.y, waypoint.x, waypoint.y);
}

console.log(Math.abs(ship.x) + Math.abs(ship.y));