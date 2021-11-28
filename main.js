var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

const SPAWN_NAME = 'sp1';

const HARVESTER_ROLE = 'Harvester';
const UPGRADER_ROLE = 'Upgrader';
const BUILDER_ROLE = 'Builder'

const HARVESTER_COUNT = 5;
const UPGRADER_COUNT = 2;
const BUILDER_COUNT = 5;

module.exports.loop = function() {
    let harvesters = getCreepsByRole(HARVESTER_ROLE);
    let upgraders = getCreepsByRole(UPGRADER_ROLE);
    let builders = getCreepsByRole(BUILDER_ROLE);

    if (harvesters.length < HARVESTER_COUNT) {
        let name = HARVESTER_ROLE + harvesters.length;

        createCreep(name, HARVESTER_ROLE);
    }

    if (upgraders.length < UPGRADER_COUNT) {
        let name = UPGRADER_ROLE + upgraders.length;

        createCreep(name, UPGRADER_ROLE);
    }

    if (builders.length < BUILDER_COUNT) {
        let name = BUILDER_ROLE + builders.length;

        createCreep(name, BUILDER_ROLE);
    }

    harvesters.forEach((creep) => roleHarvester.run(creep));
    upgraders.forEach((creep) => roleUpgrader.run(creep));
    builders.forEach((creep) => roleBuilder.run(creep));
}

function createCreep(name, role) {
    let firstCode = Game.spawns[SPAWN_NAME].createCreep([WORK, CARRY, MOVE], name, { role: role });

    if (firstCode === ERR_NOT_ENOUGH_ENERGY || firstCode === ERR_BUSY) {
        return;
    }

    if (firstCode === ERR_NAME_EXISTS) {
        name = role + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

        let code = Game.spawns[SPAWN_NAME].createCreep([WORK, CARRY, MOVE], name, { role: role });

    }
}

function getCreepsByRole(role) {
    return Object.keys(Game.creeps).map((name) => {
            let creep = Game.creeps[name];

            if (creep.memory.role === role) {
                return creep;
            }
        }).filter(creep => creep !== undefined);;
}


    // Game.spawns[SPAWN_NAME].createCreep([ATTACK, MOVE], 'a1');
    // var a1 = Game.creeps['a1'];
    // a1.moveTo(Game.spawns['Pidor'])