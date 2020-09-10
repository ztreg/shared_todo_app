const app = require('../../app')
const bcrypt = require('bcryptjs')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {disconnect} = require('../../database/mongodb')
const { expect, request} = chai
chai.should()
require('dotenv').config()
const authenticationModel = require('../../models/authenticationModel')
const user = require('../../models/userModel')
const todo = require('../../models/todoModel')
const todolist = require('../../models/todoListModel')
const { insertTodo } = require('../../models/todoModel')

describe('Integration tests for todolist', () => {
	beforeEach(async function () {
    // Clear all data id DB
    await todo.clearAllTodos()
    await todolist.clearAllTodoLists({})
    await user.clearAllUsers()

    // Get data from file or function
    //Arrange 3 users
    let newUser =	{
      username: "jonas1",
      password: "123",
      role: "member"
    }
    await user.addUser(newUser)
    let newUser2 = {
      username: "jonas2",
      password: "1234",
      role: "member"
    }
    await user.addUser(newUser2)
    let userAdmin = {
      username: "jonasadmin",
      password: "12345",
      role: "admin"
    }
    await user.addUser(userAdmin)
    const userone = await user.getUser({username: 'jonas1'})
    let useroneId = userone._id.toString()
    const usertwo = await user.getUser({username: 'jonas2'})
    // console.log(usertwo);
    const useradmin = await user.getUser({username: 'jonasadmin'})
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
      listId: listone._id,
      urgent: true
    }
    const firstTodo = await todo.insertTodo(newTodo)
    newTodo.title = 'ey testar lite 2'
    newTodo.userid = usertwoId
    newTodo.listId = listtwo._id
    const secondTodo = await todo.insertTodo(newTodo)
  
    //Assert that list owners has the same name as users creater etc
    expect(userone.username).to.be.deep.equal(listone.creator)
    expect(firstTodo.listId).to.be.deep.equal(listone._id.toString())

    // Add info to current test

    this.currentTest.token2 = await authenticationModel.login({username: userone.username, password: '123' })
    this.currentTest.token = await authenticationModel.login({username: usertwo.username, password: '1234' })
    this.currentTest.admin = await authenticationModel.login({username: useradmin.username, password: '12345' })
    this.currentTest.userID = newUser.id
    this.currentTest.todoListId = listone._id.toString()
    this.currentTest.user2ID = usertwoId.toString()

    let todoListToAdd = {
      title : 'todolist from htttp',
      creator : userone.username
    }
    
    this.currentTest.todoListToAdd = todoListToAdd 
  })
  it('Should get A specific list', async function() {
  const listToGet = await todolist.getTodoList({title: 'Users first todolist! woh'})
    request(app)
    .get(`/todolist?todoListId=${listToGet._id}`)
    .set('Authorization', `Bearer ${this.test.admin.token}`)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('todoLists')
    })
  })
  it('Should add a list', async function() {
    request(app)
    .post(`/todolist`)
    .set('Authorization', `Bearer ${this.test.token2.token}`)
    .send(this.test.todoListToAdd)
    .end((err, res) => {
     res.should.have.status(201)
     res.body.should.be.a('object')
     res.body.should.have.property('added')
   })
  })

  it('Should fail to edit a list', async function()  {
    // Edit anothers list
    console.log('wat');
    // console.log(this.test.token.token);
    // console.log(this.test.todoListId);
   request(app)
   .patch(`/todolist/${this.test.todoListId}`)
   .set('Authorization', `Bearer ${this.test.token.token}`)
   .send({title: "updated list"})
   .end((err, res) => {
     res.should.have.status(401)
     res.body.should.be.a('object')
     res.body.should.have.property('errormsg')
   })
  })
  it('Should success to edit your own list', async function () {
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
  it('Should fail to delete a list ', async function() {
    //Delete anothers list
    request(app)
    .delete(`/todolist/${this.test.todoListId}`)
    .set('Authorization', `Bearer ${this.test.token.token}`)
    .end((err, res) => {
      res.should.have.status(401)
      res.body.should.be.a('object')
      res.body.should.have.property('errormsg')
    })
  })
  it('and succeed as the correct user', async function() {
    //Delete your own list
    request(app)
    .delete(`/todolist/${this.test.todoListId}`)
    .set('Authorization', `Bearer ${this.test.token2.token}`)
    .end((err, res) => {
      res.should.have.status(201)
      res.body.should.be.a('object')
    })
  })
  after(async() => {
    await user.clearAllUsers()
    await todo.clearAllTodos()
    await todolist.clearAllTodoLists({})
  })
})
