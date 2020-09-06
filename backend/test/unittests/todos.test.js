require('dotenv').config('../')
const chai = require('chai')
chai.should()
const { expect } = require('chai')
const todomodel = require('../../models/todoModel')
const usermodel = require('../../models/userModel')
const todoListModel = require('../../models/todoListModel')
const {disconnect} = require('../../database/mongodb')

describe('Unit Tests for todos', function ()  {
    it('add todo for a user in a list', async () => {
        //Arrange
        const user = await usermodel.getUser({username: 'membername'})
        const todoList = await todoListModel.getTodoList({creator: 'membername'})
        const todo = {
            title: 'testTodo',
            done: false,
            userid: user._id,
            listId: todoList._id
        }
        const result = await todomodel.insertTodo(todo)
        result.should.be.deep.an('object')
        expect(todoList._id).to.be.equal(todo.listId)
        expect(todo.title).to.be.equal(result.title)
    })
    it('should edit a todo', async function() {
        //Get a todo to update
        const existingTodo = await todomodel.getTodo({title: 'testTodo'})
        const todoList = await todoListModel.getTodoList({creator: 'membername'})
        const todoToUpdate = {
            title: 'testTodoUpdated',
            done: true,
            todoId: existingTodo._id,
            listId: todoList._id
        }
        await todomodel.updateTodo(todoToUpdate)
        const updatedTodo = await todomodel.getTodo({title: 'testTodoUpdated'})
        expect(updatedTodo.title).to.be.deep.equal(todoToUpdate.title)
    })
    it('should delete a todo', async function() {
        
        const todoToDelete = await todomodel.getTodo({title: 'testTodoUpdated'})
        
        const todoList = await todoListModel.getTodoList({creator: 'membername'})

        const allTodos = await todomodel.getTodos('createdAt', -1, 0, null, todoToDelete.listId)
        const result = await todomodel.deleteTodo(todoToDelete._id)
        const allTodos2 = await todomodel.getTodos('createdAt', -1, 0,  null, todoToDelete.listId)
        
        expect(result).to.be.deep.an('object')
        expect(allTodos.count).to.be.greaterThan(allTodos2.count)
    })
})
