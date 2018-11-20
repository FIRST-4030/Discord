const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const settings = require('./settings.json');
const path = require("path");

const client = new Commando.Client({
    unknownCommandResponse: false,
    owner: settings.ownerID,
    commandPrefix: '~'
});

client.registry
    .registerGroups([
        ['todo', 'Commands for ToDo management'],
        ['util', 'Utility Commands']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(settings.token);

client.on('ready', () => {
    console.log("Ready!");
});