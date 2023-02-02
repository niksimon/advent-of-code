const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

// thanks to https://github.com/jonathanpaulson/

const players = [
    {pos: +inputs[0].split(' ')[4], score: 0},
    {pos: +inputs[1].split(' ')[4], score: 0}
]

const cache = {};

console.log(game(players));

function game(players) {
    if(players[0].score >= 21) {
        return [1, 0];
    }
    if(players[1].score >= 21) {
        return [0, 1];
    }

    const key = `${players[0].pos}:${players[1].pos}:${players[0].score}:${players[1].score}`;

    if(cache[key] !== undefined) {
        return cache[key];
    }

    const wins = [0, 0];
    
    for(let i = 1; i <= 3; i++) {
        for(let j = 1; j <= 3; j++) {
            for(let k = 1; k <= 3; k++) {
                const newPlayer = Object.assign({}, players[0]);
                newPlayer.pos = (newPlayer.pos + (i + j + k) - 1) % 10 + 1;
                newPlayer.score = newPlayer.score + newPlayer.pos;

                const nextWins = game([players[1], newPlayer]);
                wins[0] += nextWins[1];
                wins[1] += nextWins[0];
            }
        }
    }

    cache[key] = wins;

    return wins;
}