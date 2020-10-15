require('dotenv').config('../')

const chai = require('chai')
chai.should()
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const todomodel = require('../../models/todoModel')
const usermodel = require('../../models/userModel')
const todolistmodel = require('../../models/todoListModel')
const {disconnect, testConnect} = require('../../database/mongodb')


describe('Unit Tests for todolist', () => {
    before(async function(){
        await todolistmodel.clearAllTodoLists({})
        await usermodel.clearAllUsers()
        await todomodel.clearAllTodos()
    })
    beforeEach(async function () {

    })
    it('Should create a list and compare result to be a list', async function () {
        function hashPW (password) {
            return bcrypt.hashSync(password, 10)
        }
        //Arrange owner and Arrange List
        const member = {
            username: "membername",
            password: "password123",
            role: "member"
        }
        const aOwner = await usermodel.addUser(member)
        // console.log(aOwner)
        const firstTodoList = {
            title : 'Users first todolist! woh',
            creator : aOwner.username,
            userIds : [aOwner._id.toString()]
        }
        // Act, submit a list with arranged data
        const newTodoList = await todolistmodel.insertTodoList(firstTodoList)

        // Assert that the arranged owner is the owner of the list
        expect(aOwner.username).to.be.equal(member.username)
        expect(newTodoList.userIds).to.be.an('array')
        expect(newTodoList.userIds[0]).to.be.equal(aOwner._id.toString())
    })
    it('Should edit a list', async function() {

        // Act, edit a list with arranged data
        const currentTodoList = await todolistmodel.getTodoList({title: 'Users first todolist! woh'})

        const todoListData = {
            title : 'edited todolist',
            listId: currentTodoList._id
        }

        const result = await todolistmodel.updateTodoList(todoListData)
        expect(result).to.be.an('object')
    })
    it('Should delete a list', async function() {
        const aList = await todolistmodel.getTodoList({title: 'edited todolist'})

        const result = await todolistmodel.deleteTodoList(aList._id)
        expect(result).to.be.an('object')
        expect(result.deletedCount).to.be.equal(1)
    })
    after(async () => {
        await todolistmodel.clearAllTodoLists({})
        await usermodel.clearAllUsers()
        await todomodel.clearAllTodos()
    })
})
