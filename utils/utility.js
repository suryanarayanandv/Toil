function CreateTask(TaskSet, task) {
    // append to the TaskSet
    console.log(task);
    TaskSet.push(task);
    return TaskSet;
}

function DeleteTask(TaskSet, task) {
    let index = -1;
    for (let item in TaskSet) {
        index++;
        if (TaskSet[item].title == task.title) {
            console.log('removing', TaskSet[index].title)
            TaskSet.splice(index, 1);
            break;
        }
    }
    return TaskSet;
}

function UpdateTask(TaskSet, task, updatedTask) {
    let index = -1;
    for (let item in TaskSet) {
        index++;
        if (TaskSet[item].title == task.title) {
            TaskSet[index] = updatedTask;
            console.log(TaskSet[index])
            break;
        }
    }
    return TaskSet;
}

module.exports = { CreateTask, DeleteTask, UpdateTask }