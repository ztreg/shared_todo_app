const {Todo} = require('../database/mongodb');
module.exports = {
    insertTodo: async (title, done) => {
        return await Todo.create({
            title: title,
            done: done
        }).then((document,err ) => {
            if(err) return false;
            return document._id;
        });
    },

    updateTodo: async (title, done, todoId) => {
        console.log("making update for..." +todoId)
       return await Todo.findByIdAndUpdate(todoId, { "title": title, "done": done}, {useFindAndModify: false, versionKey: false})
            .then((document,err ) => {
                console.log("made update..." + document)
                if(err) return false;
                return document._id;
            });
    },
    deleteTodo: async (todoId) => {
        console.log("removing todo with id" + todoId)
        return await Todo.deleteOne({_id: todoId})
            .then((document,err ) => {
                if(err) return false;
                return document.deletedCount;
            });
    },
    getTodos: async() => {
        console.log("getting todos for you")
        return await Todo.find({}, {})
    },
    getTodo: async(todoId) => {
        return await Todo.findOne({_id: todoId}, {'title': 1, 'done': 1})
    }
}