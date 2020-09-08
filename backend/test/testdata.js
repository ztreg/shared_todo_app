const userModel = require('../models/userModel')
const todomodel = require('../models/todoModel')
const todoListModel = require('../models/todoListModel')

module.exports = {
    getTestUsers: async() => {
        const users = [
            amanda = {
                username: "Amanda",
                password: "123",
                role: "member"
            },
            jonas = {
                username: "jonas",
                password: "123",
                role: "member"
            },
            pelle = {
                username: "pelle",
                password: "123",
                role: "member"
            }
        ]
         
        return users
    }

}