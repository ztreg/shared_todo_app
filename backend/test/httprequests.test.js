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
const todolist = require('../models/todoListModel')

describe('HTTP tests', () => {
	beforeEach(async function () {
    await todo.clearAllTodos()
    await todolist.clearAllTodoLists()
    await user.clearAllUsers()
		function hashPassword(password) {
			return bcrypt.hashSync(password, 10)
    }
    
    //Arrange users
    let newUser =	{
      username: "jonas1",
      password: hashPassword("123"),
      role: "member"
    }
    await user.addUser(newUser)
    newUser.username = 'jonas2'
    await user.addUser(newUser)

    const userone = await user.getUser({username: 'jonas1'})
    let useroneId = userone._id.toString()
    const usertwo = await user.getUser({username: 'jonas2'})
    let usertwoId = usertwo._id.toString()
    
    //Arrange todoLists
    let newTodoList = {
      title : 'Users first todolist! woh',
      creator : userone.username,
      userIds : [useroneId]
    }
    
    await todolist.insertTodoList(newTodoList)
    newTodoList.userIds[0] = usertwoId
    newTodoList.userIds[1] = useroneId
    newTodoList.title = 'Users second todolist! woh'
    newTodoList.creator = usertwo.username
    await todolist.insertTodoList(newTodoList)

    const listone = await todolist.getTodoList({creator: userone.username})
    const listtwo = await todolist.getTodoList({creator: usertwo.username})
  
    // Arrange todos
    let newTodo = {
      title: "testar lite",
      done: false,
      userid: useroneId,
      listId: listone._id
    }
    const firstTodo = await todo.insertTodo(newTodo)
    newTodo.title = 'testar lite 2'
    newTodo.userid = usertwoId
    newTodo.listId = listtwo._id
    const secondTodo = await todo.insertTodo(newTodo)
  
    // console.log(listone._id)
    // console.log(firstTodo.listId)
    //Assert that list owners has the same name as users creater etc
    expect(userone.username).to.be.deep.equal(listone.creator)
    expect(firstTodo.listId).to.be.deep.equal(listone._id.toString())

    this.currentTest.token2 = await authenticationModel.login({username: userone.username, password: '123' })
    this.currentTest.token = await authenticationModel.login({username: usertwo.username, password: '123' })
    this.currentTest.userID = newUser.id
    this.currentTest.todoListId = listone._id.toString()
    this.currentTest.user2ID = usertwoId.toString()
    //this.currentTest.user2ID = 
	})
	 it('should search for posts with a text', async function() {	 
     // console.log(this.test.token.token)
	 	request(app)
		 .get('/todo/search?searchText=test')
		 .set('Authorization', `Bearer ${this.test.token.token}`)
	 	  .end((err, res) => {
			 expect(res).to.have.status(200)
       expect(res).to.be.json
     })
   })
   it('Should check if the right user is editing the list', async function()  {
     // Edit anothers list
    request(app)
    .patch(`/todolist/${this.test.todoListId}`)
    .set('Authorization', `Bearer ${this.test.token.token}`)
    .send({title: "updated list"})
    .end((err, res) => {
      res.should.have.status(401)
      res.body.should.be.a('object')
      res.body.should.have.property('errormsg')
    })
    // Edit your own list
    request(app)
    .patch(`/todolist/${this.test.todoListId}`)
    .set('Authorization', `Bearer ${this.test.token2.token}`)
    .send({title: "updated list"})
    .end((err, res) => {
      res.should.have.status(201)
      res.body.should.be.a('object')
    })
  })
  it('should check if the right user is deleting the list', async function() {
    //Delete anothers list
    request(app)
    .patch(`/todolist/${this.test.todoListId}`)
    .set('Authorization', `Bearer ${this.test.token.token}`)
    .end((err, res) => {
      res.should.have.status(401)
      res.body.should.be.a('object')
      res.body.should.have.property('errormsg')
    })
    //Delete your own list
    request(app)
    .delete(`/todolist/${this.test.todoListId}`)
    .set('Authorization', `Bearer ${this.test.token2.token}`)
    .end((err, res) => {
      res.should.have.status(201)
      res.body.should.be.a('object')
    })
  })
})
