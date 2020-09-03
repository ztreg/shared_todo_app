const chai = require('chai')
chai.should()
const bcrypt = require('bcryptjs')
const { addUser, clearAllUsers, getUsers} = require('../models/userModel')
const {disconnect} = require('../database/mongodb')
const userModel = require('../models/userModel')
const { expect } = require('chai')

describe('Add user', () => {
    
    it('should create new user to testdb', async function () {
        //Arrange
        function hashPW (password) {
            return bcrypt.hashSync(password, 10)
        }
        const admin = {
            username: "Amanda",
            password: hashPW("Amanda"),
            role: "admin"
        }
        
        //Act, add new users
        const adminResult = await userModel.addUser(admin)
      
        //Assert
        adminResult.should.be.deep.an('object')
        expect(adminResult.username).to.be.equal(admin.username)
    
    })
})

describe('Searching for users', () => {

    it('Should find all the users with "A" as a first letter', async function () {

        //Arrange
        const searchText = 'C'
        const regex = new RegExp(searchText, 'i')

        //Act
        const users = await getUsers(searchText)
        // console.log(users)
        //Assert
        users.should.be.an('array')

        for (const user of users) {
            user.should.have.property('username')
            user.should.satisfy(() => { return regex.test(user.username) })
        }
        
    })
    after(() => {
        disconnect()
    })
})
