require('dotenv').config('../')

const chai = require('chai')
chai.should()
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const todomodel = require('../models/todoModel')
const usermodel = require('../models/userModel')
const todolistmodel = require('../models/todoListModel')
const {disconnect} = require('../database/mongodb')


describe('Tests for todolist', () => {

    beforeEach(async function () {
        // await usermodel.clearAllUsers()
        // await todolistmodel.clearAllTodoLists()
        // await todomodel.clearAllTodos()
    })
    it('Should create a list and compare result to be a list', async function () {
        function hashPW (password) {
            return bcrypt.hashSync(password, 10)
        }
        
        //Arrange owner and Arrange List
        const member = {
            username: "membername",
            password: hashPW("password123"),
            role: "member"
        }
        const aOwner = await usermodel.addUser(member)
        // console.log(aOwner._id)
        const firstTodoList = {
            title : 'Users first todolist! woh',
            creator : aOwner.username,
            userIds : [aOwner._id.toString()]
        }
        // Act, submit a list with arranged data
        const newTodoList = await todolistmodel.insertTodoList(firstTodoList)

        // Assert that the arranged owner is the owner of the list
        //console.log(newTodoList)
        expect(aOwner.username).to.be.equal(member.username)
        expect(newTodoList.userIds).to.be.an('array')
        expect(newTodoList.userIds[0]).to.be.equal(aOwner._id.toString())
    })
})