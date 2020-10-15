const {Todo, User, TodoList} = require('../database/mongodb');
module.exports = {
    insertTodo: async (todo) => {
        try {
           return await Todo.create({title: todo.title, userid: todo.userid, listId: todo.listId, urgent: todo.urgent })
        } catch(error) {
            return error
        }
    },
    updateTodo: async (todoFilter) => {
        try {
            // console.log(todoFilter);
            return await Todo.updateOne({_id: todoFilter.todoId},{ $set: todoFilter})
            //console.log(status);
        } catch (error) {
            console.log(error);
            return error
        }
    },
    deleteTodo: async (todoId) => {
        try {
            return await Todo.deleteOne({_id: todoId})
        } catch (error) {
            return error
        } 
    },
    clearAllTodos: async (listfilter) => {
        try {
            return await Todo.deleteMany(listfilter)
        } catch (error) {
            console.log(error)
            return error
        }
    },
    getTodos: async(sortBy = 'createdAt', direction = -1, page = 0, userid = null, listId = null) => {
        if(direction === 'asc') {
            direction = -1
        }if(direction === 'desc') {
            direction = 1
        }
        let sortobject = {}
        sortobject[sortBy] = direction

        let pageLimit = 5
        let returnobject = {};
        /**
         * Make sure page cant go -1
         */
        if(page < 0) {
            page = 0
        }
        /**
         * switch direction to a number for mongo
         */
        try {
            if(userid === null) {
                
                if(sortBy) {
                    // console.log('admin here, get me all!' + sortBy + direction + ' in list ' + listId)
                    returnobject.count = await Todo.countDocuments({listId: listId})
                    returnobject.data = await Todo.find({listId}).sort( sortobject ).skip(page * pageLimit).limit(pageLimit)
                    return returnobject
                } else {
                    return await Todo.find({listId}, {}).skip(page * pageLimit).limit(pageLimit)
                }
            }
            else if(userid) {
                if(sortBy) {
                    // console.log('member here, get me my and/ or my groups todos with userid! ' + userid)
                    returnobject.count = await Todo.countDocuments({userid: userid, listId: listId})
                    let members = await TodoList.find( {_id: listId}, {userIds: 1});
                    // console.log(members[0].userIds.length)
                    if(members[0].userIds.length > 1) {
                        // Get all todos for this list
                        returnobject.data = await Todo.find({listId}).sort( sortobject ).skip(page * pageLimit).limit(pageLimit)
                    } else {
                        // Get only the todos for the specific user on that list
                        returnobject.data = await Todo.find({userid: userid, listId: listId}).sort( sortobject ).skip(page * pageLimit).limit(pageLimit)
                    }
                    return returnobject
                }  else {
                    return await Todo.find({userid: userid, listId: listId}, {}).skip(page * pageLimit).limit(pageLimit)
                }
            }
        } catch(error) {
            return error
        }
    },
    getTodo: async(todoFilter) => {
        try {
            return await Todo.findOne(todoFilter)
        } catch (error) {
            return error
        }
    },
    getTodosSearch: async(searchtext = '', userid = null, listId = null) => {
        try {
            if(userid === null) {
                if(searchtext == '') {
                   return await Todo.find( {}, {}).sort().skip(1 * 5).limit(5)
                } else {
                    return await Todo.find({listId: listId, title: new RegExp(searchtext, 'i')}, {})
                }
            } else {
                if(searchtext == '') {
                    return await Todo.find ({listId: listId, userid: userid} ).sort().skip(1 * 5).limit(5)
                 } else {
                     // console.log(searchtext + userid + listId);
                    return await Todo.find({listId: listId, userid: userid, title: new RegExp(searchtext, 'i')}, {})
                 }
            }
        } catch (error) {
            return error
        }
    },
    // Archive page
    getFinishedTodos: async(userid = null) => {
        // console.log('gettin dat finished')
        try {
            if(userid === null) {
                return await Todo.find( {done: true}, {}).sort()
            } else {
                return await Todo.find( {userid: userid, done: true}, {}).sort()
            }
        } catch (error) {
            return error
        }

    }
}