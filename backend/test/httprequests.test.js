const app = require('../app')
const bcrypt = require('bcryptjs')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {disconnect} = require('../database/mongodb')
const { expect, request} = chai
chai.should()
require('dotenv').config()
const authenticationModel = require('../models/authenticationModel')
const user = require('../models/userModel')
const todo = require('../models/todoModel')

describe('HTTP tests', () => {
	beforeEach(async function () {
    await user.clearAllUsers()
		function hashPassword(password) {
			return bcrypt.hashSync(password, 10)
		}
		const newUser = await user.addUser({
			username: "jonas",
			password: hashPassword("123"),
			role: "admin"
    })
    const userone = await user.getUser({username: 'jonas'})
    const todoToSearchFor = await todo.insertTodo({
      title: "testar lite",
      done: false,
      userid: userone._id,
      listId: null
    })
    console.log(todoToSearchFor)
    this.currentTest.token = await authenticationModel.login({username: newUser.username, password: '123' })
		this.currentTest.userID = newUser.id
	})
	 it('should search for posts with a text', async function() {	 
     console.log(this.test.token.token)
	 	request(app)
		 .get('/todo/search?searchText=test')
		 .set('Authorization', `Bearer ${this.test.token.token}`)
	 	.end((err, res) => {
			 expect(res).to.have.status(200)
       expect(res).to.be.json
     })
	 })
})
