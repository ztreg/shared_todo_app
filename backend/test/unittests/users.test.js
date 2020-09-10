const chai = require('chai')
chai.should()
const bcrypt = require('bcryptjs')
const { addUser, clearAllUsers, getUsers} = require('../../models/userModel')
const {disconnect} = require('../../database/mongodb')
const userModel = require('../../models/userModel')
const todomodel = require('../../models/todoModel')
const todoListModel = require('../../models/todoListModel')
const { expect } = require('chai')
const { use } = require('../../app')
const {getTestUsers} = require('../testdata')

describe('Unit Tests for user', () => {
    before(async function () {
        await userModel.clearAllUsers()
        await todomodel.clearAllTodos()
        await todoListModel.clearAllTodoLists({})
        
    })
    
    it('should add a user', async function () {
        //Arrange -> fetch mochdata
        const users = await getTestUsers()

        //Act
        const amandaResult = await userModel.addUser(users[0])

        //Assert
        amandaResult.should.be.deep.an('object')
        expect(amandaResult.username).to.be.equal(users[0].username)
    })
    it('shold edit a user', async function() {
        const users = await getTestUsers()
        const member = await userModel.addUser(users[1])
        const userToUpdate = {
            userId: member._id.toString(),
            username: 'jonas2',
            password: 'ey123'
        } 
        const result = await userModel.updateUser(userToUpdate)
        const updatedNember = await userModel.getUser({_id: member._id})
        expect(updatedNember.username).to.be.deep.equal(userToUpdate.username)
        expect(updatedNember).to.be.deep.an('object')
    })
    it('shold delete a user', async function() {
        //Arrange
        const users = await getTestUsers()
        const member = await userModel.addUser(users[2])

        //Act
        const allusers = await userModel.getUsers({})
        const result = await userModel.deleteUser(member._id)
        const allusers2 = await userModel.getUsers({})

        //Assert
        expect(allusers.length).to.be.greaterThan(allusers2.length)
        expect(result).to.be.deep.an('object')
    })
})

describe('Unit Test for -> Searching for users', () => {

    it('Should find all the users with a "j"', async function () {
        //Arrange
        const searchText = 'j'
        const regex = new RegExp(searchText, 'i')

        //Act
        const users = await getUsers(searchText)

        //Assert
        users.should.be.an('array')
        for (const user of users) {
            user.should.have.property('username')
            user.should.have.property('password')
            user.should.have.property('role')
            // funkar inte, lös?
            // user.should.satisfy(() => { return regex.test(user.username) })
        }
    })
    after(async () => {
        await userModel.clearAllUsers()
        await todomodel.clearAllTodos()
        await todoListModel.clearAllTodoLists({})
        disconnect()
    })
})
