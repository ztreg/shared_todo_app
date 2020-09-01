require('dotenv').config('../')
const chai = require('chai')
chai.should()

const todomodel = require('../models/todoModel')

describe('find all todos by a user', () => {
    it('should return all todos', async () => {
        const todo = {
            title: 'testTodo',
            done: false,
            userid: '5f4d1181adb45813d00a76ee'
        }
        const result = await todomodel.insertTodo(todo)
        result.should.be.deep.an('object')
    })
    it('should throw an error', async () => {
        const todo2 = {
            titlle: 'testTodadadasdasdadado',
            done: false,
            userid: '5f4d1181adb45813d00a76ee'
        }
        const result2 = await todomodel.insertTodo(todo2)
        result2.should.be.deep.an('error')
    })
})