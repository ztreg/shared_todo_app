const todoModel = require('../models/todoModel');
const { countDocuments } = require('../database/mongodb');

module.exports = {
    addTodo: async (req, res) => {
        // console.log('adding todo')
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
        let count = await todoModel.deleteTodo(req.params.todoId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getTodos: async (req, res) => { // IF we just want JUST the archive page
      if(req.query.finished) {
        if(req.user.isAdmin()) {
            res.json(await todoModel.getFinishedTodos()) 
        } else if (req.user.isMember()) {
           res.json(await todoModel.getFinishedTodos(req.user.userId))
          }
      }// Not arhive page
      else { 
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
            res.json(await todoModel.getTodosSearch(req.query.searchText)) 
        } else if (req.user.isMember()) {
            // console.log('text: ' + req.query.searchText)
           res.json(await todoModel.getTodosSearch(req.query.searchText, req.user.userId))
        }
    }
}
