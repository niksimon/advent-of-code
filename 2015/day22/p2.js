const fs = require("fs");
const input = fs.readFileSync(`./input.txt`, "utf-8").split("\r\n");

const boss = {
    hp: +input[0].split(": ")[1],
    damage: +input[1].split(": ")[1]
}

const player = {
    hp: 50,
    mana: 500
}

const spells = {
    "Magic Missile": {cost: 53, damage: 4},
    "Drain": {cost: 73, damage: 2, heal: 2},
    "Shield": {cost: 113, timer: 6, armor: 7},
    "Poison": {cost: 173, timer: 6, damage: 3},
    "Recharge": {cost: 229, timer: 5, mana: 101}
};

let minMana = 999999999;

const stack = [{
    turn: 'player',
    player: {hp: player.hp, mana: player.mana, armor: 0},
    boss: {hp: boss.hp, damage: boss.damage},
    manaSpent: 0,
    effects: {
        Shield: {active: false, timer: 0},
        Poison: {active: false, timer: 0},
        Recharge: {active: false, timer: 0}
    }}];

while(stack.length > 0) {
    const move = stack.pop();
    const newMove = JSON.parse(JSON.stringify(move));

    // Reduce player hp by 1
    if(move.turn === 'player') {
        newMove.player.hp--;
        if(gameOver(newMove)) {
            continue;
        }
    }

    // Cast effects
    castEffects(newMove);
    
    if(gameOver(newMove)) {
        continue;
    }

    newMove.turn = newMove.turn === 'player' ? 'boss' : 'player';

    // Player turn
    if(move.turn === 'player') {
        // Magic Missile
        if(newMove.player.mana > spells["Magic Missile"].cost) {
            const newMoveT = JSON.parse(JSON.stringify(newMove));
            newMoveT.manaSpent += spells["Magic Missile"].cost;
            newMoveT.player.mana -= spells["Magic Missile"].cost;
            newMoveT.boss.hp -= spells["Magic Missile"].damage;

            if(!gameOver(newMoveT)) {
                stack.push(newMoveT);
            }
        }
        // Drain
        if(newMove.player.mana > spells["Drain"].cost) {
            const newMoveT = JSON.parse(JSON.stringify(newMove));
            newMoveT.manaSpent += spells["Drain"].cost;
            newMoveT.player.mana -= spells["Drain"].cost;
            newMoveT.boss.hp -= spells["Drain"].damage;
            newMoveT.player.hp += spells["Drain"].heal;

            if(!gameOver(newMoveT)) {
                stack.push(newMoveT);
            }
        }
        // Shield
        if(!newMove.effects["Shield"].active && newMove.player.mana > spells["Shield"].cost) {
            const newMoveT = JSON.parse(JSON.stringify(newMove));
            newMoveT.effects['Shield'].active = true;
            newMoveT.effects['Shield'].timer = spells["Shield"].timer;
            newMoveT.player.armor = spells["Shield"].armor;
            newMoveT.manaSpent += spells["Shield"].cost;
            newMoveT.player.mana -= spells["Shield"].cost;
            stack.push(newMoveT);
        }

        // Poison
        if(!newMove.effects["Poison"].active && newMove.player.mana > spells["Poison"].cost) {
            const newMoveT = JSON.parse(JSON.stringify(newMove));
            newMoveT.effects['Poison'].active = true;
            newMoveT.effects['Poison'].timer = spells["Poison"].timer;
            newMoveT.manaSpent += spells["Poison"].cost;
            newMoveT.player.mana -= spells["Poison"].cost;
            stack.push(newMoveT);
        }

        // Recharge
        if(!newMove.effects["Recharge"].active && newMove.player.mana > spells["Recharge"].cost) {
            const newMoveT = JSON.parse(JSON.stringify(newMove));
            newMoveT.effects['Recharge'].active = true;
            newMoveT.effects['Recharge'].timer = spells["Recharge"].timer;
            newMoveT.manaSpent += spells["Recharge"].cost;
            newMoveT.player.mana -= spells["Recharge"].cost;
            stack.push(newMoveT);
        }

    }
    // Boss turn
    else if(move.turn === 'boss') {
        newMove.player.hp -= Math.max(1, newMove.boss.damage - newMove.player.armor);
        if(gameOver(newMove)) {
            continue;
        }
        stack.push(newMove);
    }
}

console.log(minMana);

function gameOver(_move) {
    if(_move.boss.hp <= 0) {
        minMana = Math.min(minMana, _move.manaSpent);
        return true;
    }
    if(_move.player.hp <= 0) {
        return true;
    }
    
    return false;
}

function castEffects(_move) {
    for(const effect of Object.keys(_move.effects)) {
        if(_move.effects[effect].active) {
            _move.effects[effect].timer--;

            if(effect === 'Poison') {
                _move.boss.hp -= spells[effect].damage;
            }
            else if(effect === 'Recharge') {
                _move.player.mana += spells[effect].mana;
            }

            if(_move.effects[effect].timer === 0) {
                _move.effects[effect].active = false;

                if(effect === 'Shield') {
                    _move.player.armor = 0;
                }
            }
        }
    }
}