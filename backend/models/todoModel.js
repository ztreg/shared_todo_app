const {Todo, User} = require('../database/mongodb');
module.exports = {
    insertTodo: async (todo) => {
        return await Todo.create({title: todo.title, done: todo.done, userid: todo.userid, listIds: "5f49108bb1781d124ce22ffc" })
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
        if(direction === 'asc') {
            direction = -1
        }if(direction === 'desc') {
            direction = 1
        }
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
        return await Todo.findOne({_id: todoId}, {'title': 1, 'done': 1, 'userid': 1})
    },
    getTodosSearch: async(searchtext = '', userid = null) => {
        console.log(userid + ' searches for ' + searchtext)
        if(userid === null) {
            if(searchtext == '') {
               return await Todo.find( {}, {}).sort().skip(1 * 5).limit(5)
            } else {
                return await Todo.find( {title: new RegExp(searchtext, 'i')}, {})
            }
        } else {
            if(searchtext == '') {
                return await Todo.find ({userid: userid} ).sort().skip(1 * 5).limit(5)
             } else {
                return await Todo.find({userid: userid, title: new RegExp(searchtext, 'i')}, {})
             }
        }
    },
    getFinishedTodos: async(userid = null) => {
        console.log('gettin dat finished')
        if(userid === null) {
            return await Todo.find( {done: true}, {}).sort()
        } else {
            return await Todo.find( {userid: userid, done: true}, {}).sort()
        }
    },
    getCollabTodos: async(users) => {
        let test =  await Todo.find({users},{})
        console.log(test)
    }
}