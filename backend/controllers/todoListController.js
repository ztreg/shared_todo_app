const todoListModel = require('../models/todoListModel');

module.exports = {
    addTodoList: async (req, res) => {
        const todoList = {
            title: req.body.title,
            creator: req.user.username,
            userIds: [req.user.userId] 
        }
        let added = await todoListModel.insertTodoList(todoList);
        let status = added ? 201 : 500;
        res.status(status).json({added});
    },
    getTodoLists: async(req, res) => {
        const userID = req.user.userId
        let todoLists = {}
        // get specific
        if(req.query.todoListId) {
            todoLists = await todoListModel.getTodoList(req.query.todoListId)
        }
        // get all
        else if(req.user.isAdmin()){
            todoLists = await todoListModel.getTodoLists()
        }
        // get one or many
        else {
            console.log('get this lad his lists')
            todoLists = await todoListModel.getTodoLists(userID)
        }
        let status = todoLists ? 200 : 500;
        res.status(status).json({todoLists});
    },
    updateTodoList: async (req, res) => {
        const list = {
            listId : req.params.todoListId
        }
        if(req.body.title) list.title = req.body.title
        if(req.query.userToAdd) list.userId = req.query.userToAdd

        let updatedId = await todoListModel.updateTodoList(list)
        let status = updatedId ? 201 : 500;
        res.status(status).json({updatedId: updatedId});
    },
    deleteTodoList: async (req, res) => {
        console.log('time to delete bro' + req.params.todoListId )
        let count = await todoListModel.deleteTodoList(req.params.todoListId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    }
}