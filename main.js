var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

const HARVESTER_ROLE = 'Harvester';
const UPGRADER_ROLE = 'Upgrader';

const HARVESTER_COUNT = 5;
const UPGRADER_COUNT = 2;

module.exports.loop = function() {
    let harvesters = getCreepsByRole(HARVESTER_ROLE);
    let upgraders = getCreepsByRole(UPGRADER_ROLE);

    if (harvesters.length < HARVESTER_COUNT) {
        let name = HARVESTER_ROLE + harvesters.length;

        createCreep(name, HARVESTER_ROLE);
    }

    if (upgraders.length < UPGRADER_COUNT) {
        let name = UPGRADER_ROLE + upgraders.length;

        createCreep(name, UPGRADER_ROLE);
    }

    harvesters.forEach((creep) => roleHarvester.run(creep));
    upgraders.forEach((creep) => roleUpgrader.run(creep));

    let creep = Game.creeps['a1'];
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(target) {
        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}

function createCreep(name, role) {
    let firstCode = Game.spawns.VitekerSpaw.createCreep([WORK, CARRY, MOVE], name);

    if (firstCode === ERR_NOT_ENOUGH_ENERGY || firstCode === ERR_BUSY) {
        return;
    }

    if (firstCode === ERR_NAME_EXISTS) {
        name = role + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

        let code = Game.spawns.VitekerSpaw.createCreep([WORK, CARRY, MOVE], name);

    }

    Game.creeps[name].memory.role = role;
}

function getCreepsByRole(role) {
    return Object.keys(Game.creeps).map((name) => {
            let creep = Game.creeps[name];

            if (creep.memory.role === role) {
                return creep;
            }
        }).filter(creep => creep !== undefined);;
}


    // Game.spawns.VitekerSpaw.createCreep([ATTACK, MOVE], 'a1');
    // var a1 = Game.creeps['a1'];
    // a1.moveTo(Game.spawns['Pidor'])