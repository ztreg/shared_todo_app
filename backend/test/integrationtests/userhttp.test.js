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
const todo = require('../../models/todoModel')
const todolist = require('../../models/todoListModel')

describe('Integration tests for Users', function () {
    beforeEach(async function() {
        await userModel.clearAllUsers()
        async function hashPassword(password) {
			return bcrypt.hashSync(password, 10)
        }
        const newUser = await userModel.addUser({username: 'httpuser23', password: await hashPassword('123'), role: 'member'})
        this.currentTest.userid = newUser._id
        this.currentTest.member1 = await authenticationModel.login({username: newUser.username, password: '123'})
    })

    it('Should add a user', async function() {
        const fields = { username: "httpuser", password: "123" }
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
    it('Should edit a user', async function() {
        const fields = { username : "httpuser23edited" }
        request(app)
        .patch(`/users/${this.test.userid}`)
        .send(fields)
        .set('Authorization', `Bearer ${this.test.member1.token}`)
        .end((err, res) => {
            expect(res).to.be.json
            res.body.should.have.property('updated_count')
        })
    })
    it('Should get a user', async function() {
        request(app)
        .get(`/users/${this.test.userid}`)
        .set('Authorization', `Bearer ${this.test.member1.token}`)
        .end((err, res) => {
            console.log(res.body)
            expect(res).to.be.deep.an('object')
        })
    })
    it('Should delete a user', async function() {
        request(app)
        .delete(`/users/${this.test.userid}`)
        .set('Authorization', `Bearer ${this.test.member1.token}`)
        .end((err, res) => {
            expect(res).to.be.json
            res.body.should.have.property('response')
        })
    })
})