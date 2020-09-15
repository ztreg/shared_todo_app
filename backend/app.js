require('dotenv').config();
const express = require('express');

const todoRoute = require('./routes/todo');
const loginRoute = require('./routes/authentication')
const userRoute = require('./routes/user')
const todoListRoute = require('./routes/todolist');

const app = express();
const cors = require('cors')

// const frondEnd = require('./routes/frontend');

const path = require('path')
const port = process.env.PORT || 8081;

/**
 * Middleware
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('./public'))
app.use(cors())

/**
 * Route link
 */

app.use('/todo', todoRoute)
app.use('/users', userRoute)
app.use('/login', loginRoute)
app.use('/todolist', todoListRoute)


module.exports = app
