const Commando = require('discord.js-commando');
const TaskUtils = require('../../TaskUtils');
const settings = require('../../settings.json');

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'add',
            aliases: ['a'],
            group: 'todo',
            memberName: 'add',
            description: 'Add a task to the ToDo channel',
            examples: ['~add -t important thing -d important thing that needs to be done'],
            guildOnly: true,
            args: [
                {
                    key: 'task',
                    prompt: 'you shouldn\'t see this',
                    type: 'string',
                    // This makes an annoyingly long response but it's neccesary sooo
                    validate(val) {
                        console.log(val);
                        return /^-t .+? -d .+?$/.test(val);
                    },
                    // Seperates the input into title and desc
                    parse(val) {
                        let parts = [];
                        parts[0] = val.substring(val.search('-t') + 3, val.search(' -d'));
                        parts[1] = val.substring(val.search('-d') + 3, val.length);
                        return parts;
                    }
                }
            ],
            argsPromptLimit: 0
        })
    }

    async run(message, { task }) {
        let exists = false;
        
        // Get ToDo channel
        const todo = message.guild.channels.get(settings.todo_channel);

        // Get Tasks
        todo.fetchMessages()
            .then(tasks => {
                // Check each task for the same title
                tasks.array().forEach(t => {
                    if (t.content.startsWith(`**${task[0]}**`)) {
                        message.reply('A task with that title already exists');
                        exists = true;
                    }
                });

                
            }).then(() => {
                // If there are no tasks with that title, send the task
                if (!exists)
                    TaskUtils.addTask(todo, task, message);
            })
            .catch(e => {
                console.error(e);
                message.react('‼');
            });
    }
}