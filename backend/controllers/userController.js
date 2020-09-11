const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const todoModel = require('../models/todoModel');
const todoListModel = require('../models/todoListModel');

function hashPW (password) {
    return bcrypt.hashSync(password, 10)
}

module.exports = {
    addUser: async (req, res) => {
        const user = {
            username: req.body.username,
            password: req.body.password,
            role: "member"
        }
        if(user.role != 'admin') {
            let addedId = await userModel.addUser(user)
            let status = addedId ? 201 : 400
            let msg = addedId ? 'New account created' : 'That username already exists'
            res.status(status).json({msg})
        }
        else {
            res.status(401).json({msg: 'Cannot add a admin'})
        }
       
    },
    updateUser: async (req, res) => {
        let userToEdit = req.params.userId;
        if(userToEdit) {
            if(!req.user.isme(userToEdit) ) {
                console.log('incorrect user is trying to edit this user')
                return res.status(401).json({msg: 'incorrect user is trying to edit this user'})
            }
            const userToUpdate = {
                userId: userToEdit,
            }
    
            if(req.body.username) userToUpdate.username = req.body.username
            if(req.body.password) userToUpdate.password = hashPW(req.body.password)

            // console.log(userToUpdate)

            let lastId = await userModel.updateUser(userToUpdate)
            let status = lastId ? 201 : 500;
            res.status(status).json({updated_count: lastId});
        }

    },
    deleteUser: async (req, res) => {
        let userId = req.params.userId
            if(!req.user.isme(userId)) {
                console.log('incorrect user is trying to delete this user')
                return res.status(401).json({msg: 'incorrect user is trying to delete this user'})
            }
            let listcount;
            //Delete all lists and todos with this user
            const ownedTodoLists = await todoListModel.getTodoLists(userId)

            for(let i = 0; i < ownedTodoLists.length; i++ ) {
                    if(ownedTodoLists[i].userIds.length > 1) {
                         // There are other users in this list

                        for(let x = 0; x < ownedTodoLists[i].userIds.length; x++) {
                            if(ownedTodoLists[i].userIds[x] === userId){
                                // Remove userID from userlistarray
                                ownedTodoLists[i].userIds.splice(x, 1)
                                ownedTodoLists[i].listId = ownedTodoLists[i]._id
                                listcount += await todoListModel.updateTodoList(ownedTodoLists[i])
                            }
                        }
                    } else {
                        // The user is the only owner

                        listcount += await todoListModel.deleteTodoList(ownedTodoLists[i]._id)
                        console.log('deleted a solo list');
                    }
            }

            let deleteResult2 = await todoModel.clearAllTodos({userid: userId})
            let response = await userModel.deleteUser(userId)
            let status = response ? 201 : 500;

            return res.status(status).json({response: response});   
    },
    getUsers: async (req, res) => {
        if(req.query.searchUserText) {
            return res.json(await userModel.getUsers(req.query.searchUserText))  
        }
        res.json(await userModel.getUsers())   
    },
    getUser: async (req, res) => {
        res.json(await userModel.getUser({Userinfo: req.params.userId}))  
    },
    getUserAll: async(req, res) => {
        
        if(!req.user.isme(req.params.userId)) {
            console.log('incorrect user is trying to delete this user')
            return res.status(401).json({msg: 'incorrect user is trying to delete this user'})
        }
        let todos = await userModel.getUserTodos(req.params.userId)
        let lists = await todoListModel.getTodoLists(req.params.userId)
        let response = {
            todos, lists
        }
        if(todos.length > 0) {
            res.status(200).json(response) 
        } else {
            res.status(404).json("userid not found") 
        }
         
    },
    getUserTodos: async(req, res) => {
        
        if(!req.user.isme(req.params.userId)) {
            console.log('incorrect user is trying to delete this user')
            return res.status(401).json({msg: 'incorrect user is trying to delete this user'})
        }
        let response = await userModel.getUserTodos(req.params.userId)
        if(response.length > 0) {
            res.status(200).json(response) 
        } else {
            res.status(404).json("userid not found") 
        }
         
    }
}