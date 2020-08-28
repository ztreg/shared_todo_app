const todoListModel = require('../models/todoListModel');

module.exports = {
    addTodoList: async (req, res) => {
        
            const todoList = {
                title: req.body.title,
                creator: req.body.creator,
                userIds: req.body.userIds
            }
            let added = await todoListModel.insertTodoList(todoList);
            let status = added ? 201 : 500;
            res.status(status).json({added});
   

    },
    getTodoLists: async(req, res) => {
        const userID = req.user.userId
        let rez = await todoListModel.getTodoLists(userID)
        let status = rez ? 200 : 500;
        res.status(status).json({rez});

    }
}