const todoRouter = require('express').Router();
const todoController = require('../controllers/todoController');
const { authorization } = require('../middlewares/authorization')

todoRouter.get('/:sorted/:direction/:page?', authorization, todoController.getTodos);

todoRouter.get('/:searchtext/:userId?', authorization, todoController.getTodosSearch);

todoRouter.post('/add', authorization, todoController.addTodo);

todoRouter.delete('/delete/:todoId', authorization, todoController.deleteTodo);

todoRouter.patch('/update/:todoId', authorization, todoController.updateTodo);

todoRouter.patch('/done/:todoId', authorization, todoController.doneTodo);

module.exports = todoRouter