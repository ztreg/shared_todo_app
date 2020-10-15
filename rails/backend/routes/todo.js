const todoRouter = require('express').Router();
const todoController = require('../controllers/todoController');
const { authorization } = require('../middlewares/authorization')

todoRouter.get('/search/:listId', authorization, todoController.getTodosSearch);

todoRouter.get('/', authorization, todoController.getTodos);

todoRouter.get('/:todoId', authorization, todoController.getTodo);

todoRouter.post('/:listId', authorization, todoController.addTodo);

todoRouter.delete('/:todoId', authorization, todoController.deleteTodo);

todoRouter.patch('/:todoId', authorization, todoController.updateTodo);

module.exports = todoRouter