require('dotenv').config();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function createToken (payload) {
    return jwt.sign(payload, secret, {expiresIn : '1h'})
}

module.exports = {
    login: async (req, res) => {
        /**
         * Get user with username
         */
        console.log('loggin in with username ' + req.body.username + ' pw: ' + req.body.password)
        const user = await userModel.getUser({username: req.body.username})
        if(user) {
            // If we get a match on the username -> check hashed pw
            const checkedPassword = bcrypt.compareSync(req.body.password, user.password)

            // If we get a match on the password -> return a token to the client
            if(checkedPassword) {
                let token = createToken({userId: user._id, role: user.role, username: user.username})
                console.log(token)
                console.log('login success')
                res.status(200).json({token: token, username: user.username, role: user.role })

            } else {
                res.status(401).json({msg: "wrong password"})
            }
        } else {
            res.status(401).json({msg: "wrong username"})
        }
    },
    checkToken: async(req, res) => {
        console.log(req.user.username)
        const response = {
            isLoggedIn : true,
            userid: req.user.id,
            role: req.user.role,
            username: req.user.username
        }
        res.status(200).json(response)
    }
}