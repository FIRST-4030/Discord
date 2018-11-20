module.exports = {
    /**
     * Sends task to the todo channel
     * 
     * @param {Channel} todo - Channel to send the task to
     * @param {Array} task - Array with task title and description
     * @param {Message} message - The message calling the command
     */
    addTask: function(todo, task, message) {
        todo.send(`**${task[0]}**\n${task[1]}`)
            .then(() => {
                message.react("👌");
            })
            .catch(e => {
                console.error(e);
                message.react('‼');
            });
    },

    /**
     * Removes a task from the todo channel
     * 
     * @param {Message} task - The task message
     * @param {Message} message - The message calling the command
     */
    removeTask: function(task, message) {
        task.delete()
            .then(() => {
                message.react("👌");
            })
            .catch(e => {
                console.error(e);
                message.react('‼');
            });
    },

    // TODO: check and finish this
    /**
     * Parse arguments to be used in a command
     * 
     * @param {string} val - value passed as an argument
     * @return {Map} - Map containing every value with it's corresponding flag
     */
    parseArgs: function(val) {
        let args = new Map();
        let regex = / -. /;

        // Add a space to the start of val for searching
        val = ' ' + val;

        // Loop until val has no more flags in it
        while (val.search(regex) != -1) {
            // Get and remove flag
            let flag = val.substring(0, 3).trim();
            val = val.slice(3);
            // Get and remove value
            let endIndex = (val.search(regex) != -1)? val.search(regex) : val.length
            let value = val.substring(0, endIndex);
            val = val.slice(endIndex);
            // Add flag and value to the map
            args.set(flag, value);
        }
        
        return args;
    }
}