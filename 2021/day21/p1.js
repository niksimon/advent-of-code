const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const players = [
    {pos: +inputs[0].split(' ')[4], score: 0},
    {pos: +inputs[1].split(' ')[4], score: 0}
]

let dice = 1;
let timesRolled = 0;

game: while(true) {
    for(const player of players) {
        let moves = 3;
        let nextPos = 0;

        while(moves-- > 0) {
            nextPos += dice++;
            dice = dice > 100 ? 1 : dice;
        }

        timesRolled += 3;

        player.pos = (player.pos + nextPos - 1) % 10 + 1;

        player.score += player.pos;

        if(player.score >= 1000) {
            break game;
        }
    }
}

console.log(players[0].score > players[1].score ? players[1].score * timesRolled : players[0].score * timesRolled);