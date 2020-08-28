const todoListRouter = require('express').Router();
const todoListController = require('../controllers/todoListController');
const { authorization } = require('../middlewares/authorization')


todoListRouter.get('/', authorization, todoListController.getTodoLists);
// 
// todoRouter.get('/:sorted/:direction/:page?', authorization, todoController.getTodos);
// 
// todoRouter.get('/:searchtext?', authorization, todoController.getTodosSearch);
// 
todoListRouter.post('/add', authorization, todoListController.addTodoList);

// todoRouter.delete('/delete/:todoId', authorization, todoController.deleteTodo);
// 
// todoRouter.patch('/update/:todoId', authorization, todoController.updateTodo);
// 
// todoRouter.patch('/done/:todoId', authorization, todoController.doneTodo);

module.exports = todoListRouter