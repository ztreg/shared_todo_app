const {Todo, User, TodoList } = require('../database/mongodb');
const todoController = require('../controllers/todoController');

module.exports = {
    insertTodoList: async (todoList) => {
        try {
            return await TodoList.create(todoList)
        } catch (error) {
            return error
        }
    },
    getTodoLists: async (userId) => {
        // console.log('eyyyyyyyyyyyyy')
        if(userId) {
            // Either 1 or many lists
            try {
                return await TodoList.find({
                    userIds: {
                        $in: [userId]
                    }}, {})
            } catch (error) {
                return error
            }
        } else {
            // Admin
            return await TodoList.find({})
        }
        
    },
    getTodoList: async (listfilter) => {
        try {
            return await TodoList.findOne(listfilter)
        } catch (error) {
            return error
        }
    },
    updateTodoList: async (list) => {
        try {
            if(list.userId) {
                // Add user to list
                return await TodoList.updateOne(
                    { _id: list.listId }, 
                    { $push: { userIds: list.userId } },
                );
            } else {
                // Update fields in list
                return await TodoList.updateOne({_id: list.listId},
                    { $set: list }, 
                    {useFindAndModify: false, versionKey: false});
            }
        } catch (error) {
            return error
        }
    },
    deleteTodoList: async (listId) => {
        try {
            return await TodoList.deleteOne({_id: listId})
        } catch (error) {
            return error
        }
    },
    clearAllTodoLists: async (filter) => {
        try {
            return await TodoList.deleteMany(filter)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}