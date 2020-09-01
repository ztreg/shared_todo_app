const todoRouter = require('express').Router();
const todoController = require('../controllers/todoController');
const { authorization } = require('../middlewares/authorization')

todoRouter.get('/', authorization, todoController.getTodos);

todoRouter.get('/:searchtext?', authorization, todoController.getTodosSearch);

todoRouter.post('/', authorization, todoController.addTodo);

todoRouter.delete('/:todoId', authorization, todoController.deleteTodo);

todoRouter.patch('/:todoId', authorization, todoController.updateTodo);

module.exports = todoRouter