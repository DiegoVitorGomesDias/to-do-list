const tasksModel = require("../models/tasksModel");

const getAll = async (_request, response) =>
{
    const tasks = await tasksModel.getALL();
    return response.status(200).json(tasks);
};

const createTask = async (request, response) =>
{
    const taskcreated = await tasksModel.createTask(request.body);
    return response.status(201).json( { insertId: taskcreated.insertId });
};

const deleteTask = async (request, response) =>
{
    const { id } = request.params;

    await id === "all" ?  tasksModel.deleteAllTasks() : tasksModel.deleteTask(id);

    return response.status(204).json({ msg: "taskdeleted" });
};

const updateTask = async (request, response) =>
{
    const { id } = request.params;
    const { body } = request;

    // console.log(id, body);
    await tasksModel.updateTask(id, body);
    return response.status(204).json({ msg: "taskdeleted" });
};


module.exports = 
{
    getAll,
    createTask,
    deleteTask,
    updateTask
};