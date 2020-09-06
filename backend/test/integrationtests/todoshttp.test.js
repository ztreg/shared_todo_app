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

describe('Integration tests for todos', () => {
    beforeEach(async function()  {
        const userTwo = await user.getUser({username: 'jonas2'})
        const userAdmin = await user.getUser({username : 'jonasadmin'})
        const listTwo = await todolist.getTodoList({creator: userTwo.username})
        // console.log(listTwo)
        this.currentTest.user = userTwo
        this.currentTest.token = await authenticationModel.login({username: userTwo.username, password: '123' })
        this.currentTest.admin = await authenticationModel.login({username: userAdmin.username, password: '123' })
        this.currentTest.list = listTwo
        this.currentTest.todo = {
          title: "todo from httptest", 
          done: false
        }
        
        this.currentTest.todoId = 0;
      })
      

     it('Should add a todo ', async function() {
       request(app)
       .post(`/todo?listId=${this.test.list._id}`)
       .set('Authorization', `Bearer ${this.test.token.token}`)
       .send(this.test.todo)
       .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.a('object')
      })
     })

     it('should search for todos with a text', async function() {	 
      const existingTodo = await todo.getTodo({title: 'todo from httptest'})
      request(app)
      .get(`/todo/search?searchText=e&listId=${existingTodo.listId}`)
      .set('Authorization', `Bearer ${this.test.admin.token}`)
        .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.be.deep.an('object')
        expect(res.body).to.be.deep.an('array')
      })
    })
     it('Should fail at deleting a todo(wrong user)', async function() {
      const existingTodo = await todo.getTodo({title: 'testar lite'})
      // console.log(existingTodo)
      request(app)
      .delete(`/todo/${existingTodo._id.toString()}`)
      .set('Authorization', `Bearer ${this.test.token.token}`)
      .end((err, res) => {
        res.should.have.status(401)
        res.body.should.be.a('object')
        })
     })
     
    it('Should be allowed edit a existing todo', async function() {
      const existingTodo = await todo.getTodo({title: 'todo from httptest'})
      request(app)
      .patch(`/todo/${existingTodo._id.toString()}`)
      .set('Authorization', `Bearer ${this.test.token.token}`)
      .send({title: "edited todo from httptest", done: true})
      .end((err, res) => {
       res.should.have.status(201)
       res.body.should.be.a('object')
       })
     })
})