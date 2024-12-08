const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = data[0].length;
const height = data.length;

const antennasByFrequency = {};
let antinodes = new Set();

for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        const frequency = data[i][j];
        if(frequency !== '.') {
            (antennasByFrequency[frequency] ??= []).push({x: i, y: j});
        }
    }
}

for(const freq in antennasByFrequency) {
    antennas = antennasByFrequency[freq];
    
    for(let i = 0; i < antennas.length; i++) {
        const mainAntenna = antennas[i];

        for(let j = 0; j < antennas.length; j++) {
            if(j === i) continue;

            const comparisonAntenna = antennas[j];
            const antinode = {
                x: comparisonAntenna.x - (mainAntenna.x - comparisonAntenna.x),
                y: comparisonAntenna.y - (mainAntenna.y - comparisonAntenna.y)
            };

            if(antinode.x >= 0 && antinode.x < width && antinode.y >= 0 && antinode.y < height) {
                antinodes.add(`${antinode.x},${antinode.y}`);
            }
        }
    }
}

console.log(antinodes.size);