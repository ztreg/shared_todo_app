const chai = require('chai')
chai.should()
const bcrypt = require('bcryptjs')
const { addUser, clearAllUsers, getUsers} = require('../../models/userModel')
const {disconnect} = require('../../database/mongodb')
const userModel = require('../../models/userModel')
const { expect } = require('chai')
const { use } = require('../../app')

describe('Unit Tests for user', () => {
    before(async function () {
        await userModel.clearAllUsers()
    })
    
    it('should add a user', async function () {
        //Arrange
        function hashPW (password) {
            return bcrypt.hashSync(password, 10)
        }
        const amanda = {
            username: "Amanda",
            password: hashPW("Amanda"),
            role: "member"
        }
        //Act, add new users
        const amandaResult = await userModel.addUser(amanda)
        //Assert
        amandaResult.should.be.deep.an('object')
        expect(amandaResult.username).to.be.equal(amanda.username)
    })
    it('shold edit a user', async function() {
        const member = await userModel.getUser({username: 'Amanda'})
       const userToUpdate = {
          userId: member._id.toString(),
          username: 'Amanda2',
          password: 'ey123'
       } 
       const result = await userModel.updateUser(userToUpdate)
       const updatedNember = await userModel.getUser({_id: member._id})
       expect(updatedNember.username).to.be.deep.equal(userToUpdate.username)
       expect(updatedNember).to.be.deep.an('object')
    })
    it('shold delete a user', async function() {
        const member = await userModel.getUser({username: 'Amanda2'})
        const allusers = await userModel.getUsers({})
        const result = await userModel.deleteUser(member._id)
        const allusers2 = await userModel.getUsers({})
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
    after(() => {
        disconnect()
    })
})
