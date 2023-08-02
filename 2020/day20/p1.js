const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const tiles = [];

for(let i = 0; i < inputs.length; i += 12) {
    let id = inputs[i].split(' ')[1];
    id = id.substring(0, id.length - 1);
    const tile = {
        id,
        sides: [inputs[i + 1], inputs[i + 10], "", ""], //top,down,left,right
        comparison: [0, 0, 0, 0]
    };
    for(let j = 1; j <= 10; j++) {
        tile.sides[2] += inputs[i + j][0];
        tile.sides[3] += inputs[i + j][9];
    }
    tiles.push(tile);
}

for(let i = 0; i < tiles.length - 1; i++) {
    for(let j = i + 1; j < tiles.length; j++) {
        compare(tiles[i], tiles[j]);
    }
}

const corners = tiles.filter(t => t.comparison.filter(n => n === 0).length === 2);
console.log(corners.reduce((a, c) => a * c.id, 1));

function compare(tile1, tile2) {
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            const tile1R = tile1.sides[i].split('').reverse().join('');
            const tile2R = tile2.sides[j].split('').reverse().join('');
            if(tile1.sides[i] === tile2.sides[j] ||
                tile1R === tile2.sides[j] ||
                tile1.sides[i] === tile2R ||
                tile1R === tile2R) {
                    tile1.comparison[i]++;
                    tile2.comparison[j]++;
                }
        }
    }
}