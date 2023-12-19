const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const workflows = [];
const ratings = [];

let i = -1;
while(data[++i] !== '') {
    const name = data[i].substring(0, data[i].indexOf('{'));
    const rules = data[i].substring(data[i].indexOf('{') + 1, data[i].length - 1).split(',')
                         .map(e => {
                            if(e.includes(':')) {
                                const [rule, goTo] = e.split(':');
                                return {category: rule[0], op: rule[1], value: +rule.substring(2, rule.length), goTo};
                            }
                            return {goTo: e};
                         });
    workflows[name] = rules;
}

while(++i < data.length) {
    const [x, m, a, s] = data[i].substring(1, data[i].length - 1).split(',').map(e => +e.split('=')[1]);
    ratings.push({x, m, a, s});
}

// console.log(workflows, ratings);

let result = 0;

for(const rating of ratings) {
    let currentWorkflow = workflows['in'];
    let goTo = '';

    while(currentWorkflow) {
        for(const rule of currentWorkflow) {
            goTo = rule.goTo;
            if(rule.op && rule.op === '<' && rating[rule.category] < rule.value || rule.op === '>' && rating[rule.category] > rule.value) {
                break;
            }
        }
        currentWorkflow = workflows[goTo];
    }

    if(goTo === 'A') {
        result += Object.values(rating).reduce((a, c) => a + c);
    }
}

console.log(result);