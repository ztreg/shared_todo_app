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
        // console.log('ey listid')
        // console.log(listfilter)
        try {
            return await TodoList.findOne(listfilter)
        } catch (error) {
            return error
        }
    },
    updateTodoList: async (list) => {
        try {
            if(list.userId) {
                return await TodoList.updateOne(
                    { _id: list.listId }, 
                    { $push: { userIds: list.userId } },
                );
            } else {
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
    clearAllTodoLists: async () => {
        try {
            return await TodoList.deleteMany({})
        } catch (error) {
            console.log(error)
            return error
        }
    }
}