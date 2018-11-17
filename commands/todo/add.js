const Commando = require('discord.js-commando');
const settings = require('settings.json');

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'add',
            aliases: ['a'],
            group: 'todo',
            memberName: 'add',
            description: 'Add a task to the ToDo channel',
            format: '~add -t title -d description',
            examples: ['~add -t important thing -d important thing that needs to be done'],
            guildOnly: true,
            args: [
                {
                    key: 'stuff',
                    prompt: 'you shouldn\'t see this',
                    infinite: true,
                    validate: function(val, msg, arg) {

                    }
                }
            ],
            argsPromptLimit: 0
        })
    }
}