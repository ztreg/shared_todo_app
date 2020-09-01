const todoModel = require('../models/todoModel');
const { countDocuments } = require('../database/mongodb');

module.exports = {
    addTodo: async (req, res) => {
        console.log('adding todo')
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
        let lastId = await todoModel.updateTodo(req.body.title, req.body.done, req.params.todoId)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    doneTodo: async (req, res) => {
        console.log(req.body)
        let lastId = await todoModel.doneTodo(req.body.done, req.params.todoId)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    deleteTodo: async (req, res) => {
        let count = await todoModel.deleteTodo(req.params.todoId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getTodos: async (req, res) => {
      if(req.query.finished) { // IF we just want JUST the archive page
        if(req.user.isAdmin()) {
            res.json(await todoModel.getFinishedTodos()) 
        } else if (req.user.isMember()) {
           res.json(await todoModel.getFinishedTodos(req.user.userId))
          }
      }
      else { // Not arhive page
        if(req.user.isAdmin()) {
            res.json(await todoModel.getTodos(req.query.sortFrom, req.query.direction, req.query.page, null, req.query.listId)) 
         } else if (req.user.isMember()) {
            res.json(await todoModel.getTodos(req.query.sortFrom, req.query.direction, req.query.page, req.user.userId, req.query.listId))
         }
      }   
    },
    getTodosSearch: async (req, res) => { 
        if(req.user.isAdmin()) {
            res.json(await todoModel.getTodosSearch(req.params.searchtext)) 
        } else if (req.user.isMember()) {
            console.log('text: ' + req.params.searchtext)
           res.json(await todoModel.getTodosSearch(req.params.searchtext, req.user.userId))
        }
    }
}
