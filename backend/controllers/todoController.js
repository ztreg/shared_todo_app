const todoModel = require('../models/todoModel');
const { countDocuments } = require('../database/mongodb');

module.exports = {
    addTodo: async (req, res) => {
        if(!req.user.isMember() && !req.user.isAdmin()) {
            console.log('You need to signup')
             return res.status(403).json({errormsg: 'You need to signup to add todos'})
         }
        const todo = {
            title: req.body.title,
            userid: req.user.userId,
            listId: req.query.listId
        }

        let added = await todoModel.insertTodo(todo);
        let status = added ? 201 : 500;
        res.status(status).json({added});
    },
    updateTodo: async (req, res) => {
       
        const todo = {
            todoId: req.params.todoId,
            title: req.body.title, 
            done: req.body.done
        }
       
        let lastId = await todoModel.updateTodo(todo)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    doneTodo: async (req, res) => {
        // console.log(req.body)
        let lastId = await todoModel.doneTodo(req.body.done, req.params.todoId)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    deleteTodo: async (req, res) => {
        let todoToDelete = await todoModel.getTodo(req.params.todoId)
        if(todoToDelete) {
            if(!req.user.isOwner(todoToDelete) ) {
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
      if(req.query.finished) { // IF we just want JUST the archive page
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
        // console.log('getting your search')
        if(req.user.isAdmin()) {
            res.json(await todoModel.getTodosSearch(req.query.searchText, null, req.query.listId)) 
        } else if (req.user.isMember()) {
           res.json(await todoModel.getTodosSearch(req.query.searchText, req.user.userId, req.query.listId))
        }
    }
}
