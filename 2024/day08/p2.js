const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const width = data[0].length;
const height = data.length;

const antennasByFrequency = {};
const antinodes = new Set();

for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        const frequency = data[i][j];
        if(frequency !== '.') {
            (antennasByFrequency[frequency] ??= []).push({x: i, y: j});
        }
    }
}

for(const freq in antennasByFrequency) {
    const antennas = antennasByFrequency[freq];

    for(let i = 0; i < antennas.length; i++) {
        const mainAntenna = antennas[i];
        
        for(let j = 0; j < antennas.length; j++) {
            if(j === i) continue;

            const comparisonAntenna = antennas[j];
            
            const offsetX = comparisonAntenna.x - mainAntenna.x;
            const offsetY = comparisonAntenna.y - mainAntenna.y;
            
            const antinode = {x: comparisonAntenna.x, y: comparisonAntenna.y};

            while(antinode.x >= 0 && antinode.x < width && antinode.y >= 0 && antinode.y < height) {
                antinodes.add(`${antinode.x},${antinode.y}`);
                antinode.x += offsetX;
                antinode.y += offsetY;
            }
        }
    }
}

console.log(antinodes.size);