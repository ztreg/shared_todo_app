const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs')

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
        if(userId) {
            if(!req.user.isme(userId)) {
                console.log('incorrect user is trying to delete this user')
                return res.status(401).json({msg: 'incorrect user is trying to delete this user'})
               
            }
            let response = await userModel.deleteUser(userId)
            let status = response ? 201 : 500;
            return res.status(status).json({response: response});
        }
        else {
            return res.status(500).json({msg: 'no userID given'})
        }
        
    },
    getUsers: async (req, res) => {
        if(req.query.searchUserText) {
            res.json(await userModel.getUsers(req.query.searchUserText))  
        }
        res.json(await userModel.getUsers())   
    },
    getUser: async (req, res) => {
        res.json(await userModel.getUser({Userinfo: req.params.userId}))  
    },
    getUserTodos: async(req, res) => {
        let response = await userModel.getUserPosts(req.params.userId)
        if(response.length > 0) {
            res.status(200).json(response) 
        } else {
            res.status(404).json("userid not found") 
        }
         
    }
}