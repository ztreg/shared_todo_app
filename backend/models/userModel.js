const {User, Todo} = require('../database/mongodb')
const jwt = require('jsonwebtoken')

module.exports = {
    addUser: async (user) => {
        console.log("adding User with username " + user.username)
        return await User.create(user);
    },
    updateUser: async (userToUpdate) => {
        return await User.updateOne({_id: userToUpdate.userId},
            { $set: userToUpdate}, 
            {useFindAndModify: false, versionKey: false});
    },
    deleteUser: async (deleteId) => {
            return await User.deleteOne({_id: deleteId})
    },
    getUsers: async() => {
            return await User.find({}, {})
    },
    getUser: async(Userinfo) => {
        return await User.findOne(Userinfo)
    },
    getUserTodos: async (userid) => {
        return await Todo.find({userid: userid})
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

