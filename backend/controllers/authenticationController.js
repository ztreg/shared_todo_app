require('dotenv').config();
const userModel = require('../models/userModel');
const authenticationModel = require('../models/authenticationModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
    login: async (req, res) => {
        const loginObject = {
            username: req.body.username,
            password: req.body.password
        }
        const response = await authenticationModel.login(loginObject)
        if(response) {
            // console.log(response)
            res.status(200).json({response})
        } else {
            res.status(401).json({msg: response.msg})
        }
  
    },
    checkToken: async(req, res) => {
        // console.log(req.user.username)
        const response = {
            isLoggedIn : true,
            userid: req.user.id,
            role: req.user.role,
            username: req.user.username
        }
        res.status(200).json(response)
    }
}