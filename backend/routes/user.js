const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const {authorization} = require('../middlewares/authorization')

userRouter.get('/', userController.getUsers);

userRouter.get('/:userId', authorization, userController.getUser);

userRouter.post('/', userController.addUser);

userRouter.delete('/:userId', authorization, userController.deleteUser);

userRouter.get('/:userId/todos', authorization, userController.getUserTodos)

userRouter.patch('/update/:userId', authorization, userController.updateUser)

module.exports = userRouter