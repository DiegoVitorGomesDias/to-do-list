const express = require("express");
const router = express.Router();

const tasksController = require("./controllers/tasksController");
const tasksMiddleware = require("./middlewares/tasksMiddlewares");


router.use((_req, res, next) => 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});

router.get("/", (_request, response) =>
{
    response.status(200).send("Home");
});


router.get("/tasks", tasksController.getAll);
router.post("/tasks", tasksMiddleware.validateTitle, tasksController.createTask);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put("/tasks/:id", tasksMiddleware.validateTitle, tasksMiddleware.validateStatus, tasksController.updateTask);

module.exports = router;