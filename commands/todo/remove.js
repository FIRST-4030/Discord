const Commando = require('discord.js-commando');
const TaskUtils = require('../../TaskUtils');
const settings = require('../../settings.json');

module.exports = class RemoveCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            aliases: ['r'],
            group: 'todo',
            memberName: 'remove',
            description: 'Remove a task from the ToDo channel',
            examples: ['~add -t unimportant thing'],
            guildOnly: true,
            args: [
                {
                    key: 'title',
                    prompt: 'you shouldn\'t see this',
                    type: 'string',
                    // this is incredibly lazy
                    validate(val) {
                        return val.startsWith('-t ');
                    },
                    parse(val) {
                        return val.substring(3, val.length);
                    }
                }
            ],
            argsPromptLimit: 0
        })
    }

    async run(message, { title }) {
        let exists = false;
        
        // Get ToDo channel
        const todo = message.guild.channels.get(settings.todo_channel);

        // Get tasks
        todo.fetchMessages()
            .then(tasks => {
                // Check for the task to delete
                tasks.array().forEach(t => {
                    if (t.content.startsWith(`**${title}**`)) {
                        TaskUtils.removeTask(t, message);
                        exists = true;
                    }
                });
            })
            .then(() => {
                // If the task doesn't exist
                if (!exists)
                    message.reply('No task with that title exists');
            })
            .catch(e => {
                console.error(e);
                message.react('‼');
            });
    }
}