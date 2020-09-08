const todoModel = require('../models/todoModel');
const { countDocuments } = require('../database/mongodb');
const todoListModel = require('../models/todoListModel');

module.exports = {
    addTodo: async (req, res) => {
        if(!req.user.isMember() && !req.user.isAdmin()) {
            console.log('You need to signup')
             return res.status(403).json({errormsg: 'You need to signup to add todos'})
         }
        const todo = {
            title: req.body.title,
            userid: req.user.userId,
            listId: req.params.listId
        }

        let added = await todoModel.insertTodo(todo);
        let status = added ? 201 : 500;
        res.status(status).json({added});
    },
    updateTodo: async (req, res) => {
        let listOfTodo = await todoListModel.getTodoList({_id: req.query.listId})
        let todoToEdit = await todoModel.getTodo({_id: req.params.todoId})
        if(todoToEdit) {
            if(!req.user.owns(todoToEdit) && !req.user.isListCollaborator(listOfTodo.userIds) && !req.user.isAdmin()) {
                console.log('incorrect user is trying to edit this todo')
                return res.status(401).json({msg: 'incorrect user is trying to edit this todo'})
            }
        }
        const todo = {
            todoId: req.params.todoId,
            title: req.body.title, 
            done: req.body.done,
            listId: todoToEdit.listId
        }
        //console.log(todo);
        let updateinfo = await todoModel.updateTodo(todo)
        let status = updateinfo ? 201 : 500;
        res.status(status).json({updated_count: updateinfo});
    },
    // doneTodo: async (req, res) => {
    //     // console.log(req.body)
    //     let lastId = await todoModel.doneTodo(req.body.done, req.params.todoId)
    //     let status = lastId ? 201 : 500;
    //     res.status(status).json({last_inserted_id: lastId});
    // },
    deleteTodo: async (req, res) => {
        let listOfTodo = await todoListModel.getTodoList({_id: req.query.listId})
        let todoToDelete = await todoModel.getTodo({_id: req.params.todoId})
        if(todoToDelete) {
            if(!req.user.owns(todoToDelete) && !req.user.isListCollaborator(listOfTodo.userIds) && !req.user.isAdmin()) {
                console.log('incorrect user is trying to edit this todo')
                return res.status(401).json({msg: 'incorrect user is trying to edit this todo'})
            }
        }
        let count = await todoModel.deleteTodo(req.params.todoId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getTodo: async (req, res) => {

        const todoToGet = await todoModel.getTodo(req.params.todoId)
        if(todoToGet) {
            if(!req.user.isOwner(todoToGet) && !req.user.isAdmin()) {
                console.log('incorrect user is trying to get this todo')
                return res.status(401).json({msg: 'incorrect user is trying to get this todo'})
            }
        }         
        res.status(200).json(todoToGet)
    },
    getTodos: async (req, res) => { 
      if(req.query.finished) { // IF we want JUST the archive page
        if(req.user.isAdmin()) {
            res.json(await todoModel.getFinishedTodos()) 
        } else if (req.user.isMember()) {
           res.json(await todoModel.getFinishedTodos(req.user.userId))
          }
      }
      else {  // Not arhive page
        if(req.user.isAdmin()) {
            // console.log('admin here, get me ALL todos for listid: ' + req.query.listId)
            res.json(await todoModel.getTodos(req.query.sortFrom, req.query.direction, req.query.page, null, req.query.listId)) 
         } else if (req.user.isMember()) {
            res.json(await todoModel.getTodos(req.query.sortFrom, req.query.direction, req.query.page, req.user.userId, req.query.listId))
         }
      }   
    },
    getTodosSearch: async (req, res) => { 
        if(req.user.isAdmin()) {
            res.json(await todoModel.getTodosSearch(req.query.searchText, null, req.params.listId)) 
        } else if (req.user.isMember()) {
           res.json(await todoModel.getTodosSearch(req.query.searchText, req.user.userId, req.params.listId))
        }
    }
}
