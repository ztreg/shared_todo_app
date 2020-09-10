const app = require('../../app')
const bcrypt = require('bcryptjs')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request} = chai
chai.should()

require('dotenv').config()
const authenticationModel = require('../../models/authenticationModel')
const userModel = require('../../models/userModel')
const todomodel = require('../../models/todoModel')
const todoListModel = require('../../models/todoListModel')
const {getTestUsers} = require('../testdata')

describe('Integration tests for Users', function () {
    let currentTestuserid
    let currentTestuserid2
    let currentTestmember1
    let currentTestmember2
    before(async function(){
        const users = await getTestUsers()
        const newUser = await userModel.addUser(users[0])
        const newUser2 = await userModel.addUser(users[1])
        currentTestuserid = newUser._id.toString()
        currentTestuserid2 = newUser2._id.toString()
        currentTestmember1 = await authenticationModel.login({username: newUser.username, password: '123'})
        currentTestmember2 = await authenticationModel.login({username: newUser2.username, password: '123'})
    })
    beforeEach(async function() {
        await userModel.clearAllUsers()
        await todoListModel.clearAllTodoLists({})
        await todomodel.clearAllTodos()
    })

    it('Should add a user', async function() {
        const fields = { username: "httpuser13333", password: "123" }
        request(app)
        .post('/users')
        .send(fields)
        .end((err, res) => {
            expect(res).to.be.deep.an('object')
            expect(res).to.have.status(201)
            expect(res).to.be.json
            res.body.should.have.property('msg')
        })
    })
    it('Should edit a user (myself)', async function() {
        const fields = { username : "httpuser23edited" }
        request(app)
        .patch(`/users/${currentTestuserid}`)
        .send(fields)
        .set('Authorization', `Bearer ${currentTestmember1.token}`)
        .end((err, res) => {
            expect(res).to.be.json
            expect(res).to.be.status(201)
            res.body.should.have.property('updated_count')
        })
    })
     it('Should fail edit another user', async function() {
         const fields = { username : "httpuser23edited" }
         request(app)
         .patch(`/users/${currentTestuserid}`)
         .send(fields)
         .set('Authorization', `Bearer ${currentTestmember2.token}`)
         .end((err, res) => {
             expect(res).to.be.json
             expect(res).to.be.status(401)
            //res.body.should.have.property('updated_count')
         })
     })
    it('Should get a user (myself)', async function() {
        request(app)
        .get(`/users/${currentTestuserid}`)
        .set('Authorization', `Bearer ${currentTestmember1.token}`)
        .end((err, res) => {
            console.log(res.body)
            expect(res).to.be.deep.an('object')
        })
    })
    it('Should delete a user (myself)', async function() {
        request(app)
        .delete(`/users/${currentTestuserid}`)
        .set('Authorization', `Bearer ${currentTestmember1.token}`)
        .end((err, res) => {
            expect(res).to.be.json
            expect(res).to.be.status(201)
            res.body.should.have.property('response')
        })
    })
      it('Should fail to delete another user', async function() {
          request(app)
          .delete(`/users/${currentTestuserid}`)
          .set('Authorization', `Bearer ${currentTestmember2.token}`)
          .end((err, res) => {
              expect(res).to.be.json
              expect(res).to.be.status(401)
          })
      })
      after(async ()=>{
        await userModel.clearAllUsers()
        await todoListModel.clearAllTodoLists({})
        await todomodel.clearAllTodos()
      })
})