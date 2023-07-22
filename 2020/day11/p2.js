const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let result = {map: inputs, repeating: false};

while(!result.repeating) {
    //print(result.map);
    result = round(result.map);
}

function round(map) {
    const newMap = [];
    const height = inputs.length;
    const width = inputs[0].length;

    let differentSeatsCount = 0;
    let occupiedCount = 0;

    for(let i = 0; i < height; i++) {
        newMap[i] = [];
        for(let j = 0; j < width; j++) {
            newMap[i][j] = map[i][j];

            // skip floor
            if(map[i][j] === '.') {
                continue;
            }

            // find first seat in every direction
            let adjacentOccupiedCount = 0;
            for(let k = -1; k <= 1; k++) {
                for(let l = -1; l <= 1; l++) {
                    // skip current seat
                    if(k === 0 && l === 0) continue;

                    let x = j + l;
                    let y = i + k;
                    // search until L or # is found, or out of map bounds
                    while(y >= 0 && y < height && x >= 0 && x < width) {
                        if(map[y][x] === '#') {
                            adjacentOccupiedCount++;
                            break;
                        }
                        else if(map[y][x] === 'L') {
                            break;
                        }
                        x += l;
                        y += k;
                    }
                }
            }

            // change seat according to rules
            if(map[i][j] === 'L' && adjacentOccupiedCount === 0) {
                newMap[i][j] = '#';
            }
            else if(map[i][j] === '#') {
                if(adjacentOccupiedCount >= 5) {
                    newMap[i][j] = 'L';
                }
                // count total occupied
                occupiedCount++; 
            }
            
            // count changed seats from previous layout
            if(newMap[i][j] !== map[i][j]) {
                differentSeatsCount++;
            }
        }
    }

    if(differentSeatsCount === 0) {
        console.log(`Repeating pattern, ${occupiedCount} occupied seats.`);
    }

    return {map: newMap, repeating: differentSeatsCount === 0};
}

function print(map) {
    for(let i = 0; i < map.length; i++) {
        let line = '';
        for(let j = 0; j < map[0].length; j++) {
            line += map[i][j];
        }
        console.log(line);
    }
    console.log();
}