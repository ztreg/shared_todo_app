const todoListModel = require('../models/todoListModel');

module.exports = {
    addTodoList: async (req, res) => {
        if(!req.user.isMember() && !req.user.isAdmin()) {
            console.log('incorrect user is making the request')
             return res.status(401).json({errormsg: 'incorrect user is trying to get this user'})
         }
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
        const theList = await todoListModel.getTodoList({_id: req.query.todoListId})
        // Check if the user is not a collaborator or a admin, if so. Return error
        if(!req.user.isListCollaborator(theList.userIds) && !req.user.isAdmin()) {
           console.log('incorrect user is trying to get this list')
            return res.status(401).json({errormsg: 'incorrect user is trying to get this list'})
        }
        if(req.query.todoListId) {

            todoLists = await todoListModel.getTodoList({_id: req.query.todoListId})
        }
        // get all
        else if(req.user.isAdmin()){
            todoLists = await todoListModel.getTodoLists()
        }
        // get one or many
        else {
            // console.log('get this lad his lists')
            todoLists = await todoListModel.getTodoLists(userID)
        }
        let status = todoLists ? 200 : 500;
        res.status(status).json({todoLists});
    },
    updateTodoList: async (req, res) => { 

        const listOwner = await todoListModel.getTodoList({_id: req.params.todoListId})
        const list = {
            listId : req.params.todoListId
        }

         // Check if the user is not a collaborator or a admin, if so. Return error
        if(!req.user.isListCollaborator(listOwner.userIds) && !req.user.isAdmin()) {
            // console.log('incorrect user is making the request')
            return res.status(401).json({errormsg: 'incorrect user is trying to edit this user'})
        }
        if(req.body.title) list.title = req.body.title

        // Checks if we should add a user
        if(req.query.userToAdd) list.userId = req.query.userToAdd

        let updatedId = await todoListModel.updateTodoList(list)
        let status = updatedId ? 201 : 500;
        res.status(status).json({updatedId: updatedId});
    },
    deleteTodoList: async (req, res) => {
        // console.log('time to delete bro' + req.params.todoListId )
        const listOwner = await todoListModel.getTodoList({_id: req.params.todoListId})

         // Check if the user is not a collaborator or a admin, if so. Return error
        if(!req.user.isListCollaborator(listOwner.userIds) && !req.user.isAdmin()) {
            // console.log('incorrect user is making the request')
            return res.status(401).json({errormsg: 'incorrect user is trying to edit this user'})
        }
        let count = await todoListModel.deleteTodoList(req.params.todoListId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    }
}