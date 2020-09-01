const todoListRouter = require('express').Router();
const todoListController = require('../controllers/todoListController');
const { authorization } = require('../middlewares/authorization')


todoListRouter.get('/:todoListId?', authorization, todoListController.getTodoLists);
// 
// todoRouter.get('/:sorted/:direction/:page?', authorization, todoController.getTodos);
// 
// todoRouter.get('/:searchtext?', authorization, todoController.getTodosSearch);
// 
todoListRouter.post('/', authorization, todoListController.addTodoList);

todoListRouter.delete('/:todoListId', authorization, todoListController.deleteTodoList);
// 
todoListRouter.patch('/:todoListId', authorization, todoListController.updateTodoList);
// 
// todoRouter.patch('/done/:todoId', authorization, todoController.doneTodo);

module.exports = todoListRouter