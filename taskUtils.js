module.exports.addTask = addTask;
module.exports.removeTask = removeTask;
module.exports.taskError = taskError;

// Sends the task in the ToDo channel
function addTask(todo, task, message) {
    todo.send(`**${task[0]}**\n${task[1]}`)
        .then(() => {
            message.react("👌");
        })
        .catch(taskError);
}

// Removes a task from the ToDo channel
function removeTask(task, message) {
    task.delete()
        .then(() => {
            message.react("👌");
        })
        .catch(taskError);
}

// Error response when a task function fails
function taskError(error) {
    console.error(error);
}