const todoRouter = require('express').Router();
const todoController = require('../controllers/todoController');

todoRouter.get('/', (req, res ) => {
    todoController.getTodos(req, res);
})

todoRouter.post('/add', (req, res) => {
    todoController.addTodo(req, res);
});

todoRouter.put('/update/:todoId', (req, res) => {
    todoController.updateTodo(req, res);
});

todoRouter.delete('/delete/:todoId', (req, res) => {
    todoController.deleteTodo(req, res);
});

module.exports = todoRouter