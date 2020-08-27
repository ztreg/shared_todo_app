const {Todo, User} = require('../database/mongodb');
module.exports = {
    insertTodo: async (todo) => {
        return await Todo.create({title: todo.title, done: todo.done, userid: todo.userid})
    },
    doneTodo: async (done, todoId) => {
        return await Todo.findByIdAndUpdate(todoId, {"done": done}, {useFindAndModify: false, versionKey: false})
    },
    updateTodo: async (title, done, todoId) => {
       return await Todo.findByIdAndUpdate(todoId, { "title": title, "done": done}, {useFindAndModify: false, versionKey: false})
    },
    deleteTodo: async (todoId) => {
        return await Todo.deleteOne({_id: todoId})
    },
    getTodos: async(sortBy = 'createdAt', direction = -1, page = 0, userid = null) => {
        let sortobject = {}
        sortobject[sortBy] = direction
        console.log(sortobject)

        let pageLimit = 5
        let returnobject = {};
        /**
         * Make sure page cant go -1
         */
        if(page < 0) {
            page = 0
        }
        console.log(page )
        /**
         * switch direction to a number for mongo
         */
        if(direction === 'asc') {
            direction = -1
        }if(direction === 'desc') {
            direction = 1
        }

        if(userid === null) {
            console.log('admin here, get me all!' + sortBy + direction)
            if(sortBy) {
                returnobject.count = await Todo.countDocuments({})
                returnobject.data = await Todo.find({}).sort( sortobject ).skip(page * pageLimit).limit(pageLimit)
                return returnobject
            } else {
                return await Todo.find({}, {}).skip(page * pageLimit).limit(pageLimit)
            }
        }
        else if(userid) {
            console.log('member here, get me my todos with userid! ' + userid)
            if(sortBy) {
                returnobject.count = await Todo.countDocuments({userid: userid})
                returnobject.data = await Todo.find({userid: userid}).sort( sortobject ).skip(page * pageLimit).limit(pageLimit)
                console.log(returnobject)
                return returnobject
            }  else {
                return await Todo.find({userid: userid}, {}).skip(page * pageLimit).limit(pageLimit)
            }
        }
    },
    getTodo: async(todoId) => {
        return await Todo.findOne({_id: todoId}, {'title': 1, 'done': 1})
    },
    getTodosSearch: async(searchtext = '', userid = null) => {
        if(userid === null) {
            if(searchtext == '') {
               return await Todo.find( {}, {}).sort().skip(1 * 5).limit(5)
            } else {
                let test = await Todo.find( {title: new RegExp(searchtext, 'i')}, {})
                console.log(test)
                return test
            }
        } else {
            return await Todo.find({userid}, {title: searchtext}, {})
        }
        
    }
}