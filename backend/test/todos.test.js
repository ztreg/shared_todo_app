require('dotenv').config('../')
const chai = require('chai')
chai.should()
const { expect } = require('chai')
const todomodel = require('../models/todoModel')
const usermodel = require('../models/userModel')
const todoListModel = require('../models/todoListModel')
const {disconnect} = require('../database/mongodb')

describe('find all todos by a user', function ()  {
    it('should return all todos', async () => {
        //Arrange
        const user = await usermodel.getUser({username: 'membername'})
        const todoList = await todoListModel.getTodoList({creator: 'membername'})
        //console.log(todoList._id)
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
})
