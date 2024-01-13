const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const weapons = [
    { cost: 8, damage: 4, armor: 0 },
    { cost: 10, damage: 5, armor: 0 },
    { cost: 25, damage: 6, armor: 0 },
    { cost: 40, damage: 7, armor: 0 },
    { cost: 74, damage: 8, armor: 0 },
];

const armor = [
    { cost: 13, damage: 0, armor: 1 },
    { cost: 31, damage: 0, armor: 2 },
    { cost: 53, damage: 0, armor: 3 },
    { cost: 75, damage: 0, armor: 4 },
    { cost: 102, damage: 0, armor: 5 },
];

const rings = [
    { cost: 25, damage: 1, armor: 0 },
    { cost: 50, damage: 2, armor: 0 },
    { cost: 100, damage: 3, armor: 0 },
    { cost: 20, damage: 0, armor: 1 },
    { cost: 40, damage: 0, armor: 2 },
    { cost: 80, damage: 0, armor: 3 },
];

const boss = {};
boss["hp"] = +input[0].split(": ")[1];
boss["damage"] = +input[1].split(": ")[1];
boss["armor"] = +input[2].split(": ")[1];

let maxGold = 0;

function checkWinner(_playerDamage, _playerArmor, _cost) {
    let playerWinMoves = Math.ceil(boss.hp / _playerDamage);
    let bossWinMoves = Math.ceil(100 / (Math.max(1, boss.damage - _playerArmor)));

    if(playerWinMoves > bossWinMoves) {
        maxGold = Math.max(maxGold, _cost);
    }
}

for(const w of weapons) {
    for(const a of armor) {
        let cost = w.cost + a.cost;
        
        let playerDamage = w.damage - boss.armor;
        let playerArmor = a.armor;

        // without rings
        checkWinner(playerDamage, playerArmor, cost);

        // with one ring
        for(const r of rings) {
            checkWinner(playerDamage + r.damage, playerArmor + r.armor, cost + r.cost);
        }

        // with two rings
        for(let i = 0; i < rings.length - 1; i++) {
            for(let j = i + 1; j < rings.length; j++) {
                checkWinner(playerDamage + rings[i].damage  + rings[j].damage,
                            playerArmor + rings[i].armor  + rings[j].armor,
                            cost + rings[i].cost  + rings[j].cost);
            }
        }
    }
}

console.log(maxGold);