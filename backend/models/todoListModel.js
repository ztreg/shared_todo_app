const {Todo, User, TodoList } = require('../database/mongodb');

module.exports = {
    insertTodoList: async (todoList) => {
        try {
            return await TodoList.create(todoList)
        } catch (error) {
            return error
        }
    },
    getTodoLists: async (userId) => {
        console.log('eyyyyyyyyyyyyy')
        try {
            return await TodoList.find({
                userIds: {
                    $in: [userId]
                }}, {})
        } catch (error) {
            return error
        }
    },
    getTodoList: async (listId) => {
        console.log('ey')
        try {
            return await TodoList.find({_id: listId})
        } catch (error) {
            return error
        }
    },
    updateTodoList: async (list) => {
        try {
            return await TodoList.updateOne({_id: list.listId},
                { $set: list }, 
                {useFindAndModify: false, versionKey: false});
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
    }
}