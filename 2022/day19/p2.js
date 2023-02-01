const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");

const inputs = data.split("\r\n");

const blueprints = [];

for(let i = 0; i < inputs.length; i++) {
    const line = inputs[i];
    const blueprint = {id: i + 1};
    const robots = line.split('.');
    // max ammount of minerals needed for making robots, 0 - ore, 1 - clay, 2 obsidian; geode is not needed for any robot
    const maxSpend = [0, 0, 0];

    // costs for making robot, 0 - ore, 1 - clay, 2 - obsidian, 3 geode
    const ore = robots[0].split(' ');
    blueprint.ore = [+ore[ore.length - 2], 0, 0, 0];
    maxSpend[0] = Math.max(maxSpend[0], blueprint.ore[0]);

    const clay = robots[1].split(' ');
    blueprint.clay = [+clay[clay.length - 2], 0, 0, 0];
    maxSpend[0] = Math.max(maxSpend[0], blueprint.clay[0]);

    const obsidian = robots[2].split(' ');
    blueprint.obsidian = [+obsidian[obsidian.length - 5], +obsidian[obsidian.length - 2], 0, 0];
    maxSpend[0] = Math.max(maxSpend[0], blueprint.obsidian[0]);
    maxSpend[1] = Math.max(maxSpend[1], blueprint.obsidian[1]);

    const geode = robots[3].split(' ');
    blueprint.geode = [+geode[geode.length - 5], 0, +geode[geode.length - 2], 0];
    maxSpend[0] = Math.max(maxSpend[0], blueprint.geode[0]);
    maxSpend[2] = Math.max(maxSpend[2], blueprint.geode[2]);

    blueprint.maxSpend = maxSpend;

    blueprints.push(blueprint);
}

//console.log(blueprints);

let result = 1;

for (let i = 0; i < 3; i++) {
    const blueprint = blueprints[i];
    const maxGeodes = dfs(blueprint, {ore: 1, clay: 0, obsidian: 0, geode: 0}, {ore: 0, clay: 0, obsidian: 0, geode: 0}, 32);
    result *= maxGeodes;
}

console.log(result);

// they're minerals, not rocks!!!
function dfs(blueprint, robots, minerals, time) {
    let max = minerals.geode + time * robots.geode;

    if (time <= 1) {
        return max;
    }

    for(let i = 0; i < 4; i++) {
        const robot = Object.keys(robots)[i];

        // always build geode robot when we can; if we have equal or more robots than the max needed minerals for creating specific robot we dont build anymore
        if (robot !== 'geode' && robots[robot] >= blueprint.maxSpend[i]) {
            continue;
        }

        let timeToBuild = 0;
        
        for(let j = 0; j < 4; j++) {
            const rock = Object.keys(minerals)[j];
            if(blueprint[robot][j] === 0) {
                continue;
            }
            // skip time to when we have enough minerals to build the robot
            timeToBuild = Math.max(timeToBuild, Math.ceil((blueprint[robot][j] - minerals[rock]) / robots[rock]));
        }

        timeToBuild++;

        if(timeToBuild > time) {
            continue;
        }

        const nextRobots = Object.assign({}, robots);
        const nextRocks = Object.assign({}, minerals);

        // add new robot
        nextRobots[robot]++;

        for(let j = 0; j < 4; j++) {
            const rock = Object.keys(minerals)[j];
            // increase the minerals made by the robot over time and decrease by the cost of making it
            nextRocks[rock] += robots[rock] * timeToBuild - blueprint[robot][j];
        }

        max = Math.max(max, dfs(blueprint, nextRobots, nextRocks, time - timeToBuild));
    }

    return max;
}