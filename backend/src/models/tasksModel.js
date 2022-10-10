const connection = require("./connection");

const currentDate = () =>
{
    const dateUTC = new Date(Date.now()).toUTCString();
    return dateUTC;
}

const getALL = async () =>
{
    const [tasks] = await connection.execute
    ("SELECT * FROM tasks");
    return tasks;
};

const createTask = async (task) =>
{
    const {title} = task;

    const [createdTask] = await connection.execute
    (`INSERT INTO tasks(title, status, created_date, last_modification_date) 
    VALUES("${title}", "open", "${currentDate()}", "${currentDate()}")`);

    return createdTask;
};

const deleteTask = async (taskID) =>
{
    const [deleteTask] = await connection.execute
    (`DELETE FROM tasks WHERE id = ${taskID}`);

    return deleteTask;
};

const deleteAllTasks = async () =>
{
    const [deleteTask] = await connection.execute
    (`DELETE FROM tasks WHERE id`);

    await connection.execute
    ("ALTER TABLE tasks AUTO_INCREMENT = 1");

    return deleteTask;
};

const updateTask = async (taskID, task) =>
{
    const [updateTask] = await connection.execute
    (`UPDATE tasks SET title ="${task.title}", status="${task.status}", 
    last_modification_date="${currentDate()}" WHERE id="${taskID}"`);

    return updateTask;
};

module.exports = {
    getALL,
    createTask,
    deleteTask,
    deleteAllTasks,
    updateTask
};