const {User, Todo} = require('../database/mongodb')
const jwt = require('jsonwebtoken')

module.exports = {
    addUser: async (user) => {
        try {
            const checkIfExists = await User.findOne({username: user.username})
            if(checkIfExists) return false
            else return await User.create(user);
        } catch (error) {
            return error
        }
    },
    updateUser: async (userToUpdate) => {
        try {
            return await User.updateOne({_id: userToUpdate.userId},
                { $set: userToUpdate}, 
                {useFindAndModify: false, versionKey: false});
        } catch (error) {
            return error
        }
    },
    deleteUser: async (deleteId) => {
        try {
            return await User.deleteOne({_id: deleteId})
        } catch (error) {
            return error
        }
    },
    getUsers: async() => {
        try {
            return await User.find({}, {})
        } catch (error) {
            return error
        }
    },
    getUser: async(Userinfo) => {
        try {
            return await User.findOne(Userinfo)
        } catch (error) {
            return error
        }      
    },
    getUserTodos: async (userid) => {
        try {
            return await Todo.find({userid: userid})
        } catch (error) {
            return error
        }
    },
    verifyToken: async (token) => {
        const payload = jwt.verify(token, process.env.SECRET)
        return { 
            ...payload,
            owns(document) {
                return document.userid === this.userId
            },
            isOwner(document){
                return document._id == this.userId
            },
            isAdmin(){
                return this.role === 'admin'
            },
            isMember() {
                return this.role === 'member'
            },
        }
   
    }
}

