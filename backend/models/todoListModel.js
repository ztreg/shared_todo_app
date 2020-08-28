const {Todo, User, TodoList } = require('../database/mongodb');
module.exports = {
    insertTodoList: async (todoList) => {
        console.log(todoList)
       return await TodoList.create(todoList)
    },
    getTodoLists: async (userId) => {
        records = await TodoList.find(userId).where('userId').in(userIds).exec();
        console.log(records)
        // return await TodoList.find({userIds: userId})
    }
}