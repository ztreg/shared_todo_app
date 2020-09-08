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
const todoModel = require('../../models/todoModel')

describe('Integration tests for todos', () => {
  before(async function() {
    await user.clearAllUsers()
    await todo.clearAllTodos()
    await todoModel.clearAllTodos()
  })
    beforeEach(async function()  {
        // console.log(listTwo)
        await user.clearAllUsers()
        await todo.clearAllTodos()
        async function hashPassword(password) {
          return bcrypt.hashSync(password, 10)
        }
        //listTwo = await todolist.getTodoList({creator: userTwo.username})
        let userOne = await user.addUser({username: 'jonastodohttpnono', password: '12345', role: 'member'})
        let userTwo = await user.addUser({username: 'jonastodohttp', password: '1234', role: 'member'})
        let userAdmin = await user.addUser({username: 'jonasadmin', password: '123', role: 'admin'})

        let listTwo = await todolist.insertTodoList({
          title : 'Users first todolist! woh',
          creator : userTwo.username,
          userIds : [userTwo._id.toString()]
        })

        let todoToDelete = {
          title: 'yup',
          done: false,
          userid: userTwo._id.toString(),
          listId: listTwo._id.toString()
        }
        this.currentTest.todo2 = await todoModel.insertTodo(todoToDelete)
        this.currentTest.token = await authenticationModel.login({username: userTwo.username, password: '1234' })
        this.currentTest.token2 = await authenticationModel.login({username: userOne.username, password: '12345' })
        this.currentTest.admin = await authenticationModel.login({username: userAdmin.username, password: '123' })
        this.currentTest.user = userTwo
        this.currentTest.list = listTwo
      })

     it('Should add a todo ', async function() {
      const fields = { title: "todo from httptest", done: false }
       request(app)
       .post(`/todo/${this.test.list._id}`)
       .set('Authorization', `Bearer ${this.test.token.token}`)
       .send(fields)
       .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.a('object')
      })
     })

     it('should search for todos with a text', async function() {	 
      const existingTodo = await todo.getTodo({title: 'yup'})
      request(app)
      .get(`/todo/search/${existingTodo.listId}?searchText=e`)
      .set('Authorization', `Bearer ${this.test.admin.token}`)
        .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.deep.an('object')
        expect(res.body).to.be.deep.an('array')
      })
    })
    it('Should be allowed edit a existing todo', async function() {
      const existingTodo = await todo.getTodo({title: 'yup'})
      const fields = { title: "editedyaez", done: true }
      // console.log(existingTodo._id);
      // console.log(this.test.list._id);
      request(app)
      .patch(`/todo/${existingTodo._id}?listId=${existingTodo.listId}`)
      .set('Authorization', `Bearer ${this.test.token.token}`)
      .set("Content-Type", "application/json")
      .send(fields)
      .end((err, res) => {
      // console.log(res.body);
       res.should.have.status(201)
       res.body.should.be.a('object')
       })
     })
     it('Should fail at deleting a todo(wrong user)', async function() {
      const existingTodo = await todo.getTodo({title: 'yup'})
      const fields = { title: "edited todo from httptest", done: true }
      request(app)
      .delete(`/todo/${existingTodo._id}?listId=${existingTodo.listId}`)
      .set('Authorization', `Bearer ${this.test.token2.token}`)
      .send(fields)
      .end((err, res) => {
        res.should.have.status(401)
        res.body.should.be.a('object')
        })
     })
    after(async () => {
      await user.clearAllUsers()
      await todo.clearAllTodos()
      await todoModel.clearAllTodos()
    })
})
