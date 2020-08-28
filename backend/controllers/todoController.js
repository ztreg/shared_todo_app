const todoModel = require('../models/todoModel');
const { countDocuments } = require('../database/mongodb');

module.exports = {
    addTodo: async (req, res) => {
        console.log('adding todo')
        const todo = {
            title: req.body.title,
            done: false,
            userid: req.user.userId
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
        if(req.user.isAdmin()) {
            console.log('admin here, get me all')
            res.json(await todoModel.getTodos(req.params.sorted, req.params.direction, req.params.page)) 
         } else if (req.user.isMember()) {
            console.log('member here, get me my todos')
            res.json(await todoModel.getTodos(req.params.sorted, req.params.direction, req.params.page, req.user.userId))
            // res.json(await postModel.getPosts(req.user.userId))  
         }
          
    },
    getTodosSearch: async (req, res) => {
        
        if(req.user.isAdmin()) {
            res.json(await todoModel.getTodosSearch(req.params.searchtext)) 
        } else if (req.user.isMember()) {
            console.log('text: ' + req.params.searchtext)
           res.json(await todoModel.getTodosSearch(req.params.searchtext, req.user.userId))
        }
    },
    getFinishedTodos: async(req, res) => {
        console.log('get me finished')
        if(req.user.isAdmin()) {
            res.json(await todoModel.getFinishedTodos()) 
        } else if (req.user.isMember()) {
           res.json(await todoModel.getFinishedTodos(req.user.userId))
        }
    },
    getCollabTodos: async(req, res) => {


        res.json(await todoModel.getCollabTodos())
    }
}