require('dotenv').config('../')
const chai = require('chai')
chai.should()
const { expect } = require('chai')
const todomodel = require('../../models/todoModel')
const usermodel = require('../../models/userModel')
const todoListModel = require('../../models/todoListModel')
const {disconnect} = require('../../database/mongodb')
const {getTestUsers} = require('../testdata')

describe('Unit Tests for todos', function ()  {
    // before mockdata här jonas!!!!!!
    let todotoedit = {}
    var editedtodo = {}
    let auser = {}
    let todolist2add = {}
    let todo = {}
    let result = {}
    let user = {}
    let todolist = {}

    before(async function() {
      await usermodel.clearAllUsers()
      await todomodel.clearAllTodos()
      await todoListModel.clearAllTodoLists({})

      const users = await getTestUsers()
      
      user = await usermodel.addUser(users[0])
      // console.log(user);
      todolist2add = {
        title : 'Users first todolist! woh',
        creator : user.username,
        userIds : [user._id.toString()]
      } 
      todolist = await todoListModel.insertTodoList(todolist2add)
      todo = {
         title: 'testTodo',
         done: false,
         userid: user._id,
         listId: todolist._id,
         urgent: true
      }
    })
    beforeEach(async function () {})

    it('add todo for a user in a list', async () => {
        result = await todomodel.insertTodo(todo)
        // console.log(result);
        result.should.be.deep.an('object')
        expect(todolist._id).to.be.equal(todo.listId)
        expect(todo.title).to.be.equal(result.title)
    })
    it('should edit a todo', async function() {
        //Get a todo to update
        const todoList = await todoListModel.getTodoList({_id: todolist._id})
        todotoedit = {
            title: 'testTodoUpdated',
            done: true,
            todoId: result._id,
            listId: todoList._id
        }
        const updatedTodoRes = await todomodel.updateTodo(todotoedit)
        const updatedTodo = await todomodel.getTodo({_id: result._id})
        editedtodo = updatedTodo
        expect(updatedTodo.title).to.be.deep.equal(todotoedit.title)
    })
    it('should delete a todo', async function() {
        
      // const todoList = await todoListModel.getTodoList({creator: 'membername'})
      const allTodos = await todomodel.getTodos('createdAt', -1, 0, null, editedtodo.listId)
      const result = await todomodel.deleteTodo(editedtodo._id)
      const allTodos2 = await todomodel.getTodos('createdAt', -1, 0,  null, editedtodo.listId)
      
      
      expect(result.deletedCount).to.be.equal(1)
      expect(result).to.be.deep.an('object')
      expect(allTodos.count).to.be.greaterThan(allTodos2.count)
    })
    after(async function(){
      await usermodel.clearAllUsers()
      await todomodel.clearAllTodos()
      await todoListModel.clearAllTodoLists({})
    })
})
