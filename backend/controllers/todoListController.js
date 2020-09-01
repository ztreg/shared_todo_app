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
        console.log(req.params.todoListId + 'wat')
        let todoLists = {}
        if(req.params.todoListId) {
            todoLists = await todoListModel.getTodoList(req.params.id)
        }
        else {
            todoLists = await todoListModel.getTodoLists(userID)
        }
        let status = todoLists ? 200 : 500;
        res.status(status).json({todoLists});
    },
    updateTodoList: async (req, res) => {
        const list = {
            title: req.body.title,
            listId: req.params.todoListId
        }

        if(req.body.userId) list.userIds = req.body.userId

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
    // getTodosForList: async (req, res) => {
    //     let rez = await todoListModel.getTodosForList(req.user.todoListId, req.user.userId)
    //     let status = rez ? 200 : 500;
    //     res.status(status).json({rez});
    // }
}